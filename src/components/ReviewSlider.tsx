import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";

const ReviewSlider = () => {
  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="section-padding bg-charcoal-light overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          What Our Customers Say
        </h2>
      </div>

      <div className="relative">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-charcoal-light to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-charcoal-light to-transparent z-10 pointer-events-none" />

        {/* Sliding container */}
        <div className="flex animate-slide">
          {duplicatedReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="flex-shrink-0 w-[400px] mx-4"
            >
              <div className="bg-card rounded-xl p-6 h-full border border-border hover:border-primary/50 transition-colors duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  "{review.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {review.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider;
