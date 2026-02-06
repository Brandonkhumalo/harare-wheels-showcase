import gallery1 from "@/assets/images/gallery-1.jpeg";
import gallery2 from "@/assets/images/gallery-2.jpeg";
import gallery3 from "@/assets/images/gallery-3.jpeg";
import gallery4 from "@/assets/images/gallery-4.jpeg";
import gallery5 from "@/assets/images/gallery-5.jpeg";
import gallery6 from "@/assets/images/gallery-6.jpeg";
import gallery7 from "@/assets/images/gallery-7.jpeg";
import gallery8 from "@/assets/images/gallery-8.jpeg";
import gallery9 from "@/assets/images/gallery-9.jpeg";
import gallery10 from "@/assets/images/gallery-10.jpeg";
import gallery11 from "@/assets/images/gallery-11.jpeg";

const images = [
  { src: gallery1, alt: "Exceed Auto dealership with vehicles" },
  { src: gallery2, alt: "Exceed Auto reception area" },
  { src: gallery3, alt: "Exceed Auto lounge" },
  { src: gallery4, alt: "Managing Director office" },
  { src: gallery5, alt: "Ford Raptor at Exceed Auto" },
  { src: gallery6, alt: "Exceed Auto storefront entrance" },
  { src: gallery7, alt: "Vehicle lot with inventory" },
  { src: gallery8, alt: "Exceed Auto signage" },
  { src: gallery9, alt: "Exceed Auto wall branding" },
  { src: gallery10, alt: "Toyota 86 at Exceed Auto" },
  { src: gallery11, alt: "Mercedes-Benz at Exceed Auto" },
];

const GallerySlider = () => {
  const duplicatedImages = [...images, ...images];

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">
          Our Dealership
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          Step Inside Exceed Auto
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-slide-gallery">
          {duplicatedImages.map((image, index) => (
            <div
              key={`gallery-${index}`}
              className="flex-shrink-0 w-[450px] mx-3"
            >
              <div className="rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors duration-300">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-[300px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySlider;
