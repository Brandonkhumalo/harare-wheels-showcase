from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Admin(db.Model):
    __tablename__ = 'admins'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Brand(db.Model):
    __tablename__ = 'brands'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    cars = db.relationship('Car', backref='brand', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'car_count': len(self.cars),
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Car(db.Model):
    __tablename__ = 'cars'
    
    id = db.Column(db.Integer, primary_key=True)
    brand_id = db.Column(db.Integer, db.ForeignKey('brands.id'), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    mileage = db.Column(db.Integer, nullable=True)
    fuel_type = db.Column(db.String(50), nullable=True)
    transmission = db.Column(db.String(50), nullable=True)
    body_type = db.Column(db.String(50), nullable=True)
    color = db.Column(db.String(50), nullable=True)
    engine = db.Column(db.String(100), nullable=True)
    description = db.Column(db.Text, nullable=True)
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    images = db.relationship('CarImage', backref='car', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'brand_id': self.brand_id,
            'brand_name': self.brand.name if self.brand else None,
            'model': self.model,
            'year': self.year,
            'price': self.price,
            'mileage': self.mileage,
            'fuel_type': self.fuel_type,
            'transmission': self.transmission,
            'body_type': self.body_type,
            'color': self.color,
            'engine': self.engine,
            'description': self.description,
            'featured': self.featured,
            'images': [img.to_dict() for img in self.images],
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class CarImage(db.Model):
    __tablename__ = 'car_images'
    
    id = db.Column(db.Integer, primary_key=True)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    is_primary = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'car_id': self.car_id,
            'filename': self.filename,
            'url': f'/api/uploads/{self.filename}',
            'is_primary': self.is_primary
        }
