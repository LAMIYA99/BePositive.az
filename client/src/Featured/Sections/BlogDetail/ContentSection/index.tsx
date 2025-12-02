import HeadingText from "@/Featured/Common/HeadingText";
import { Calendar, Clock } from "lucide-react";

const ContentSection = () => {
  return (
    <section className="container font-inter mx-auto py-9">
      <div className="flex flex-col gap-[52px]">
        <div>
          <HeadingText title="Blog" />
        </div>

        <div className="flex items-center gap-10 text-[#4A5565] font-inter text-[16px] font-normal  leading-6 tracking-[-0.312px] mt-6 mb-10">
          <span className="px-4 py-1 rounded-full bg-white hover:bg-black hover:text-white hover:transition-all duration-300">
            All
          </span>
          <span className="px-4 py-1 rounded-full bg-white hover:bg-black hover:text-white hover:transition-all duration-300">
            Design
          </span>
          <span className="px-4 py-1 rounded-full bg-white hover:bg-black hover:text-white hover:transition-all duration-300">
            Marketing
          </span>
          <span className="px-4 py-1 rounded-full bg-white hover:bg-black hover:text-white hover:transition-all duration-300">
            Business
          </span>
        </div>

        <div className="flex flex-col gap-4  font-inter  ">
          <h2 className="text-[36px] text-black font-medium  leading-[46px]">
            Who is a Content Creator ?
          </h2>
          <div className="text-[#6A7282] text-[14px] font-normal leading-5 tracking-[-0.15px]">
            <div className="flex gap-4 items-center">
              <span className="flex items-center gap-1">
                <Calendar size={16} /> Nov 5, 2025
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> 5 min read
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-12 mt-14 ">
        <p className="text-[#414141] font-inter text-[24px] leading-11 font-normal flex-1">
          We already understand that the word strategy is about any planning.
          When we say social media strategy, we are drawing up a general plan
          for social networks about sharing times, collaborations, trainings,
          seminars. The most important thing is to do these things consistently
          so that our audience can receive continuous information. Some people
          think that just sharing a post is enough, but no, all work must be
          continuous.
        </p>

        <div
          className="w-[542px] h-[332px] rounded-3xl bg-cover bg-center shrink-0"
          style={{
            backgroundImage: "url('./')",
          }}
        ></div>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-12">
        <div
          className="w-[542px] h-[332px] rounded-3xl bg-cover bg-center shrink-0"
          style={{
            backgroundImage: "url('/your-image-2.png')",
          }}
        ></div>

        <p className="text-[#414141] font-inter text-[24px] leading-11 font-normal flex-1">
          As the name suggests, he is a content creator, but although it sounds
          easy, his job is very difficult. Nowadays, these people need to read
          more books and communicate with people more so that they can relate
          the events that are happening to their work. In foreign markets, these
          people are offered more money because the content creator creates not
          only the title but also the general content that will be discussed.
        </p>
      </div>

      <p className="mt-10 mb-[210px] text-[#414141] font-normal text-[24px] leading-9">
        Therefore, if someone asks why social networks are needed, they are
        simply not an innovative person and after a while their work or business
        will collapse. If you have any questions, you can write to me on 
        Instagram <br /> @alamdarmanafov. Ələmdar Manafov
      </p>
    </section>
  );
};

export default ContentSection;
