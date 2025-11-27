import HeadingText from "@/Featured/Common/HeadingText";
import Accordions from "@/Featured/Components/Accordions";
import React from "react";

const FaqSection = () => {
  return (
    <div className="mt-[72px] container mx-auto">
      <HeadingText title="FAQ" />
      <div className="accardions">
        <Accordions />
      </div>
    </div>
  );
};

export default FaqSection;
