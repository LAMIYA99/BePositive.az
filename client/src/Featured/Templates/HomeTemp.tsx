import BannerSection from "../Sections/BannerSection";
import BlogSection from "../Sections/BlogSection";
import BrandSection from "../Sections/BrandsSection";
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
      <TrainingSection/> 
      <BlogSection/>
      <PlanSections />
      <ReviewSection />
 
    </div>
  );
};

export default HomeTemp;
