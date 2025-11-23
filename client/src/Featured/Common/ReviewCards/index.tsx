import React from "react";

const ReviewCard = () => {
  return (
    <div>
      <div className="box rounded-3xl bg-white p-6 flex flex-col items-center justify-center gap-6">
        <div className="w-[76px] h-[76px] border-2 rounded-[50px] overflow-hidden border-[#0808C1]">
          <img
            src="/avatar1.jpg"
            alt="avatar"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <p className="text-[16px] text-[#364153]  ">
            "Working with this agency has been transformative for our business.
            Their strategic approach and creative solutions exceeded all our
            expectations."
          </p>
        </div>
        <ul>
          <li>Sarah Johnson</li>
          <li>CEO, TechFlow</li>
        </ul>
      </div>
    </div>
  );
};

export default ReviewCard;
