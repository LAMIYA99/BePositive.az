import type { headingTypes } from "../../../Types/global";

const HeadingText = ({ title, }: headingTypes) => {
  return (
    <div>
      <div className="mx-auto container  max-w-[1200px] ">
        <div className="flex items-center justify-center text-center">
          <div className="flex  items-center ">
            <h2 className="text-[48px] leading-[55px] font-inter font-medium text-[#1B1B1B]">
              {title}  
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadingText;