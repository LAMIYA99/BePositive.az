import BannerSection from "../Sections/Home/BannerSection";
import BlogSection from "../Sections/Home/BlogSection";
import BrandSection from "../Sections/Home/BrandsSection";
import ContactSection from "../Sections/Home/ContactSection";
import FaqSection from "../Sections/Home/FaqSection";
import PlanSections from "../Sections/Home/PlanSections";
import ReviewSection from "../Sections/Home/ReviewSection";
import ServiceSection from "../Sections/Home/ServiceSection";
import TrainingSection from "../Sections/Home/TrainingSection";

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
