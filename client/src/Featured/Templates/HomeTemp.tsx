import BannerSection from "../Sections/BannerSection";
import BlogSection from "../Sections/BlogSection";
import BrandSection from "../Sections/BrandsSection";
import ContactSection from "../Sections/ContactSection";
import FaqSection from "../Sections/FaqSection";
import PlanSections from "../Sections/PlanSections";
import ReviewSection from "../Sections/ReviewSection";
import ServiceSection from "../Sections/ServiceSection";
import TrainingSection from "../Sections/TrainingSection";

const HomeTemp = () => {
  return (
    <div>
      <BannerSection />
      <BrandSection />
      <ServiceSection />
      <TrainingSection />
      <BlogSection />
      <PlanSections />
      <ReviewSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default HomeTemp;
