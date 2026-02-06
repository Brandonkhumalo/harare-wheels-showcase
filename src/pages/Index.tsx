import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import GallerySlider from "@/components/GallerySlider";
import WhyChooseUs from "@/components/WhyChooseUs";
import ReviewSlider from "@/components/ReviewSlider";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedCars />
      <GallerySlider />
      <WhyChooseUs />
      <ReviewSlider />
      <Footer />
    </div>
  );
};

export default Index;
