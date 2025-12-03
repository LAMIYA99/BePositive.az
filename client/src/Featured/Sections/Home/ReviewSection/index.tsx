import HeadingText from "@/Featured/Common/HeadingText";
import ReviewCard, { reviews } from "@/Featured/Common/ReviewCards";

const ReviewSection = () => {
  return (
    <div className="mt-[72px] container mx-auto px-6">
      <HeadingText title="Customer reviews" />
      <div className="flex flex-wrap justify-center items-center gap-[58px] mt-10 ">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
