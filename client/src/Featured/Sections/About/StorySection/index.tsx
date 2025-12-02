import HeadingText from "@/Featured/Common/HeadingText";
import StoryCard from "@/Featured/Common/StoryCard";

const StorySection = () => {
  return (
    <section className="container mx-auto py-10">
      <div className="text-center text-[#0707B0] font-inter flex flex-col gap-[22px]">
        <h1 className=" text-[36px] font-bold ">About Be Positive</h1>
        <h2 className="text-[24px] font-normal leading-6">
          #BePositive- speak whit colors, be remember with yout message!
        </h2>
      </div>

      <div className="mt-20 flex flex-col gap-[18px] items-center">
        <HeadingText title="The Story of Be Positive" />
        <p className="font-inter text-[24px] font-medium leading-[34px] text-[#414141] text-center">
          Figma ipsum component variant main layer. Font text distribute variant
          pen group pen subtract move move. <br /> Polygon opacity component
          text rectangle strikethrough slice. Blur library bold union line
          component list hand <br /> create reesizing. Selection export star
          create subtract boolean hand main. Library slice ipsum reesizing auto{" "}
          <br /> image line blur. Plugin scrolling inspect library component
          inspect ipsum rectangle. Select variant duplicate <br /> distribute
          object connection vertical.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto mt-10 px-4">
   <StoryCard/>
   <StoryCard/>
   <StoryCard/>
   <StoryCard/>
      </div>
    </section>
  );
};

export default StorySection;
