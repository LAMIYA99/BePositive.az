"use client";

import dynamic from "next/dynamic";

import BannerSection from "../Sections/Home/BannerSection";

const BrandSection = dynamic(() => import("../Sections/Home/BrandsSection"), {
  ssr: false,
  loading: () => <div className="h-32" />,
});
const ServiceSection = dynamic(
  () => import("../Sections/Home/ServiceSection"),
  {
    ssr: false,
    loading: () => <div className="h-32" />,
  }
);
const TrainingSection = dynamic(
  () => import("../Sections/Home/TrainingSection"),
  {
    ssr: false,
    loading: () => <div className="h-32" />,
  }
);
const BlogSection = dynamic(() => import("../Sections/Home/BlogSection"), {
  ssr: false,
  loading: () => <div className="h-32" />,
});

const ReviewSection = dynamic(() => import("../Sections/Home/ReviewSection"), {
  ssr: false,
  loading: () => <div className="h-32" />,
});
const FaqSection = dynamic(() => import("../Sections/Home/FaqSection"), {
  ssr: false,
  loading: () => <div className="h-32" />,
});

const HomeTemp = () => {
  return (
    <div>
      <BannerSection />
      <BrandSection />
      <ServiceSection />
      <TrainingSection />
      <BlogSection />

      <ReviewSection />
      <FaqSection />
    </div>
  );
};

export default HomeTemp;
