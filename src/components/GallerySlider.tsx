import galleryBlackSuvs from "@/assets/images/gallery-black-suvs.jpeg";
import galleryWhiteCars from "@/assets/images/gallery-white-cars.jpeg";
import galleryToyotaLineup from "@/assets/images/gallery-toyota-lineup.jpeg";
import galleryDealershipStreet from "@/assets/images/gallery-dealership-street.jpeg";
import galleryFordRanger from "@/assets/images/gallery-ford-ranger.jpeg";
import galleryAquaTrio from "@/assets/images/gallery-aqua-trio.jpeg";
import galleryRangeRover from "@/assets/images/gallery-range-rover.jpeg";
import galleryLotOverview from "@/assets/images/gallery-lot-overview.jpeg";
import galleryToyota86 from "@/assets/images/gallery-toyota-86.jpeg";
import galleryMercedesBack from "@/assets/images/gallery-mercedes-gle-back.jpeg";
import galleryMercedesFront from "@/assets/images/gallery-mercedes-gle-front.jpeg";

const images = [
  { src: galleryRangeRover, alt: "Range Rover at Exceed Auto" },
  { src: galleryFordRanger, alt: "Ford Ranger Raptor at Exceed Auto" },
  { src: galleryMercedesFront, alt: "Mercedes-Benz GLE front view" },
  { src: galleryToyota86, alt: "Toyota 86 sports car at Exceed Auto" },
  { src: galleryBlackSuvs, alt: "Black SUVs lineup at dealership" },
  { src: galleryMercedesBack, alt: "Mercedes-Benz GLE rear view" },
  { src: galleryToyotaLineup, alt: "Toyota Axio lineup" },
  { src: galleryLotOverview, alt: "Exceed Auto full lot overview" },
  { src: galleryAquaTrio, alt: "Toyota Aqua trio at dealership" },
  { src: galleryWhiteCars, alt: "White cars under canopy" },
  { src: galleryDealershipStreet, alt: "Exceed Auto street view with jacarandas" },
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
