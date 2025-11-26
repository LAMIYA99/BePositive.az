import ReviewCard, { reviews } from "@/Featured/Common/ReviewCards";
import HeadingText from "../../Common/HeadingText";

const ReviewSection = () => {
  return (
    <div className="mt-[72px] container mx-auto">
      <HeadingText title="Customer reviews" />
      <div className="flex flex-wrap justify-start items-center gap-[58px] mt-10 ">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
