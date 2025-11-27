import HeadingText from "@/Featured/Common/HeadingText";
import Accordions from "@/Featured/Components/Accordions";

const FaqSection = () => {
  const accordionsData = [
    {
      id: 1,
      title: "Can you work without an SMM service?",
      desc: "We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy.",
    },
    {
      id: 2,
      title: "Where is the filmin taking place?",
      desc: "We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy.",
    },
    {
      id: 3,
      title: "What services does Be Positive provide?",
      desc: "We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy.",
    },
    {
      id: 4,
      title: "How are prices determined?",
      desc: "We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy.",
    },
    {
      id: 5,
      title: "What is your ordering process like?",
      desc: "We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy.",
    },
    {
      id: 6,
      title: "What is your fastest delivery time?",
      desc: "We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy.",
    },
    {
      id: 7,
      title: "Why should I choose you?",
      desc: "We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy. We develop branding, social media management, content (Reels, photos, videos) writing, advertising planning, and marketing strategy.",
    },
  ];
  return (
    <div className="mt-[72px] container mx-auto">
      <HeadingText title="FAQ" />
      <div className="accardions mt-[53px] flex flex-col gap-4 items-start">
        {accordionsData &&
          accordionsData.map((acc) => (
            <Accordions key={acc?.id} title={acc?.title} desc={acc?.desc} />
          ))}
      </div>
    </div>
  );
};

export default FaqSection;
