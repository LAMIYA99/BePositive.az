import ReviewCard from "@/Featured/Common/ReviewCards";
import HeadingText from "../../Common/HeadingText";

const ReviewSection = () => {
  return (
    <div className="mt-[72px] container mx-auto">
      <HeadingText title="Customer reviews" />
      <div className="grid grid-cols-3 ">
        <ReviewCard />
      </div>
    </div>
  );
};

export default ReviewSection;
