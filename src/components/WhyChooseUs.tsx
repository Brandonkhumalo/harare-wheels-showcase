import { Shield, Truck, BadgeCheck, HeartHandshake, Wrench, CreditCard } from "lucide-react";
import galleryLotOverview from "@/assets/images/gallery-lot-overview.jpeg";
import galleryRangeRover from "@/assets/images/gallery-range-rover.jpeg";
import galleryToyotaLineup from "@/assets/images/gallery-toyota-lineup.jpeg";
import galleryMercedesFront from "@/assets/images/gallery-mercedes-gle-front.jpeg";
import galleryFordRanger from "@/assets/images/gallery-ford-ranger.jpeg";
import galleryBlackSuvs from "@/assets/images/gallery-black-suvs.jpeg";

const features = [
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every vehicle undergoes rigorous inspection before sale",
    bgImage: galleryRangeRover,
  },
  {
    icon: Truck,
    title: "Direct Imports",
    description: "Fresh imports from Japan, UK, and South Africa",
    bgImage: galleryToyotaLineup,
  },
  {
    icon: BadgeCheck,
    title: "Verified History",
    description: "Complete vehicle history and documentation",
    bgImage: galleryMercedesFront,
  },
  {
    icon: HeartHandshake,
    title: "Trusted Service",
    description: "15+ years serving Harare with integrity",
    bgImage: galleryLotOverview,
  },
  {
    icon: Wrench,
    title: "After-Sale Support",
    description: "Comprehensive service and maintenance packages",
    bgImage: galleryFordRanger,
  },
  {
    icon: CreditCard,
    title: "Flexible Financing",
    description: "Multiple payment options to suit your budget",
    bgImage: galleryBlackSuvs,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-charcoal-light">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 min-h-[240px]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0">
                <img
                  src={feature.bgImage}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-500" />
              </div>
              <div className="relative z-10 p-8">
                <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
