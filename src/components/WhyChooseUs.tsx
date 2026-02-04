import { Shield, Truck, BadgeCheck, HeartHandshake, Wrench, CreditCard } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every vehicle undergoes rigorous inspection before sale",
  },
  {
    icon: Truck,
    title: "Direct Imports",
    description: "Fresh imports from Japan, UK, and South Africa",
  },
  {
    icon: BadgeCheck,
    title: "Verified History",
    description: "Complete vehicle history and documentation",
  },
  {
    icon: HeartHandshake,
    title: "Trusted Service",
    description: "15+ years serving Harare with integrity",
  },
  {
    icon: Wrench,
    title: "After-Sale Support",
    description: "Comprehensive service and maintenance packages",
  },
  {
    icon: CreditCard,
    title: "Flexible Financing",
    description: "Multiple payment options to suit your budget",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-charcoal-light">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            The Velocity Advantage
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing an exceptional car buying experience with 
            transparency, quality, and customer satisfaction at our core.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
