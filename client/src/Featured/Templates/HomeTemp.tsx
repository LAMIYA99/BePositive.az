import BannerSection from "../Sections/BannerSection";
import BrandSection from "../Sections/BrandsSection";
import FaqSection from "../Sections/FaqSection";
import PlanSections from "../Sections/PlanSections";
import ReviewSection from "../Sections/ReviewSection";
import ServiceSection from "../Sections/ServiceSection";

const HomeTemp = () => {
  return (
    <div>
      <BannerSection />
      <BrandSection />
      <ServiceSection />
      <PlanSections />
      <ReviewSection />
      <FaqSection />
    </div>
  );
};

export default HomeTemp;
