import os
import secrets
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from functools import wraps
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from models import db, Admin, Brand, Car, CarImage

def load_env_file():
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    key = key.strip()
                    value = value.strip().strip('"').strip("'")
                    os.environ[key] = value

load_env_file()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', secrets.token_hex(32))
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db.init_app(app)

admin_tokens = {}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        token = token.replace('Bearer ', '')
        if token not in admin_tokens:
            return jsonify({'error': 'Invalid token'}), 401
        
        if admin_tokens[token]['expires'] < datetime.utcnow():
            del admin_tokens[token]
            return jsonify({'error': 'Token expired'}), 401
        
        return f(*args, **kwargs)
    return decorated

def cleanup_empty_brands():
    empty_brands = Brand.query.filter(~Brand.cars.any()).all()
    for brand in empty_brands:
        db.session.delete(brand)
    db.session.commit()

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400
    
    admin = Admin.query.filter_by(username=username).first()
    if not admin or not admin.check_password(password):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    token = secrets.token_hex(32)
    admin_tokens[token] = {
        'admin_id': admin.id,
        'expires': datetime.utcnow() + timedelta(hours=24)
    }
    
    return jsonify({
        'token': token,
        'admin': admin.to_dict()
    })

@app.route('/api/auth/logout', methods=['POST'])
@token_required
def logout():
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if token in admin_tokens:
        del admin_tokens[token]
    return jsonify({'message': 'Logged out successfully'})

@app.route('/api/auth/verify', methods=['GET'])
@token_required
def verify_token():
    return jsonify({'valid': True})

@app.route('/api/brands', methods=['GET'])
def get_brands():
    brands = Brand.query.all()
    return jsonify([brand.to_dict() for brand in brands])

@app.route('/api/brands', methods=['POST'])
@token_required
def create_brand():
    data = request.get_json()
    name = data.get('name')
    
    if not name:
        return jsonify({'error': 'Brand name required'}), 400
    
    existing = Brand.query.filter_by(name=name).first()
    if existing:
        return jsonify({'error': 'Brand already exists', 'brand': existing.to_dict()}), 409
    
    brand = Brand(name=name)
    db.session.add(brand)
    db.session.commit()
    
    return jsonify(brand.to_dict()), 201

@app.route('/api/brands/<int:brand_id>', methods=['DELETE'])
@token_required
def delete_brand(brand_id):
    brand = Brand.query.get_or_404(brand_id)
    db.session.delete(brand)
    db.session.commit()
    return jsonify({'message': 'Brand deleted'})

@app.route('/api/cars', methods=['GET'])
def get_cars():
    brand_id = request.args.get('brand_id', type=int)
    body_type = request.args.get('body_type')
    fuel_type = request.args.get('fuel_type')
    transmission = request.args.get('transmission')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    featured = request.args.get('featured', type=bool)
    
    query = Car.query
    
    if brand_id:
        query = query.filter_by(brand_id=brand_id)
    if body_type:
        query = query.filter_by(body_type=body_type)
    if fuel_type:
        query = query.filter_by(fuel_type=fuel_type)
    if transmission:
        query = query.filter_by(transmission=transmission)
    if min_price is not None:
        query = query.filter(Car.price >= min_price)
    if max_price is not None:
        query = query.filter(Car.price <= max_price)
    if featured:
        query = query.filter_by(featured=True)
    
    cars = query.order_by(Car.created_at.desc()).all()
    return jsonify([car.to_dict() for car in cars])

@app.route('/api/cars/<int:car_id>', methods=['GET'])
def get_car(car_id):
    car = Car.query.get_or_404(car_id)
    return jsonify(car.to_dict())

@app.route('/api/cars', methods=['POST'])
@token_required
def create_car():
    brand_id = request.form.get('brand_id', type=int)
    brand_name = request.form.get('brand_name')
    
    if not brand_id and brand_name:
        brand = Brand.query.filter_by(name=brand_name).first()
        if not brand:
            brand = Brand(name=brand_name)
            db.session.add(brand)
            db.session.commit()
        brand_id = brand.id
    
    if not brand_id:
        return jsonify({'error': 'Brand is required'}), 400
    
    car = Car(
        brand_id=brand_id,
        model=request.form.get('model'),
        year=request.form.get('year', type=int),
        price=request.form.get('price', type=float),
        mileage=request.form.get('mileage', type=int),
        fuel_type=request.form.get('fuel_type'),
        transmission=request.form.get('transmission'),
        body_type=request.form.get('body_type'),
        color=request.form.get('color'),
        engine=request.form.get('engine'),
        description=request.form.get('description'),
        featured=request.form.get('featured', 'false').lower() == 'true'
    )
    
    db.session.add(car)
    db.session.commit()
    
    files = request.files.getlist('images')
    for i, file in enumerate(files):
        if file and allowed_file(file.filename):
            filename = secure_filename(f"{car.id}_{datetime.now().timestamp()}_{file.filename}")
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            
            image = CarImage(
                car_id=car.id,
                filename=filename,
                is_primary=(i == 0)
            )
            db.session.add(image)
    
    db.session.commit()
    
    return jsonify(car.to_dict()), 201

@app.route('/api/cars/<int:car_id>', methods=['PUT'])
@token_required
def update_car(car_id):
    car = Car.query.get_or_404(car_id)
    
    brand_id = request.form.get('brand_id', type=int)
    brand_name = request.form.get('brand_name')
    
    if brand_name and not brand_id:
        brand = Brand.query.filter_by(name=brand_name).first()
        if not brand:
            brand = Brand(name=brand_name)
            db.session.add(brand)
            db.session.commit()
        brand_id = brand.id
    
    if brand_id:
        old_brand_id = car.brand_id
        car.brand_id = brand_id
    
    if request.form.get('model'):
        car.model = request.form.get('model')
    if request.form.get('year'):
        car.year = request.form.get('year', type=int)
    if request.form.get('price'):
        car.price = request.form.get('price', type=float)
    if request.form.get('mileage'):
        car.mileage = request.form.get('mileage', type=int)
    if request.form.get('fuel_type'):
        car.fuel_type = request.form.get('fuel_type')
    if request.form.get('transmission'):
        car.transmission = request.form.get('transmission')
    if request.form.get('body_type'):
        car.body_type = request.form.get('body_type')
    if request.form.get('color'):
        car.color = request.form.get('color')
    if request.form.get('engine'):
        car.engine = request.form.get('engine')
    if request.form.get('description'):
        car.description = request.form.get('description')
    if request.form.get('featured'):
        car.featured = request.form.get('featured', 'false').lower() == 'true'
    
    files = request.files.getlist('images')
    for i, file in enumerate(files):
        if file and allowed_file(file.filename):
            filename = secure_filename(f"{car.id}_{datetime.now().timestamp()}_{file.filename}")
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            
            image = CarImage(
                car_id=car.id,
                filename=filename,
                is_primary=False
            )
            db.session.add(image)
    
    db.session.commit()
    cleanup_empty_brands()
    
    return jsonify(car.to_dict())

@app.route('/api/cars/<int:car_id>', methods=['DELETE'])
@token_required
def delete_car(car_id):
    car = Car.query.get_or_404(car_id)
    
    for image in car.images:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
        if os.path.exists(filepath):
            os.remove(filepath)
    
    db.session.delete(car)
    db.session.commit()
    
    cleanup_empty_brands()
    
    return jsonify({'message': 'Car deleted'})

@app.route('/api/cars/<int:car_id>/images/<int:image_id>', methods=['DELETE'])
@token_required
def delete_car_image(car_id, image_id):
    image = CarImage.query.filter_by(id=image_id, car_id=car_id).first_or_404()
    
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
    if os.path.exists(filepath):
        os.remove(filepath)
    
    db.session.delete(image)
    db.session.commit()
    
    return jsonify({'message': 'Image deleted'})

@app.route('/api/uploads/<filename>')
def serve_upload(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/filters', methods=['GET'])
def get_filters():
    body_types = db.session.query(Car.body_type).distinct().filter(Car.body_type.isnot(None)).all()
    fuel_types = db.session.query(Car.fuel_type).distinct().filter(Car.fuel_type.isnot(None)).all()
    transmissions = db.session.query(Car.transmission).distinct().filter(Car.transmission.isnot(None)).all()
    
    return jsonify({
        'brands': [brand.to_dict() for brand in Brand.query.all()],
        'body_types': [bt[0] for bt in body_types],
        'fuel_types': [ft[0] for ft in fuel_types],
        'transmissions': [t[0] for t in transmissions]
    })

@app.route('/api/contact', methods=['POST'])
def send_contact_email():
    data = request.get_json()
    
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone', 'Not provided')
    subject = data.get('subject')
    message = data.get('message')
    
    if not name or not email or not subject or not message:
        return jsonify({'error': 'Missing required fields'}), 400
    
    smtp_username = os.environ.get('Username')
    smtp_password = os.environ.get('Password')
    smtp_domain = os.environ.get('Domain')
    smtp_port = int(os.environ.get('SMTPPort', 465))
    destination = os.environ.get('destination')
    
    if not all([smtp_username, smtp_password, smtp_domain, destination]):
        return jsonify({'error': 'Email configuration not set'}), 500
    
    try:
        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = destination
        msg['Subject'] = f"Website Inquiry: {subject}"
        
        body = f"""
New contact form submission from the Exceed Auto website:

Name: {name}
Email: {email}
Phone: {phone}
Subject: {subject}

Message:
{message}

---
This email was sent from the Exceed Auto website contact form.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        with smtplib.SMTP_SSL(smtp_domain, smtp_port) as server:
            server.login(smtp_username, smtp_password)
            server.sendmail(smtp_username, destination, msg.as_string())
        
        return jsonify({'message': 'Email sent successfully'})
    
    except Exception as e:
        print(f"Email error: {str(e)}")
        return jsonify({'error': 'Failed to send email'}), 500

def init_db():
    with app.app_context():
        db.create_all()
        
        if not Admin.query.first():
            admin = Admin(username='admin@autoexceed')
            admin.set_password('autoexceed@admin')
            db.session.add(admin)
            db.session.commit()
            print("Default admin created: admin@autoexceed / autoexceed@admin")

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5001, debug=True)
