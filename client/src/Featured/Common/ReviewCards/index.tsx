import React from "react";

export const reviews = [
  {
    id: 1,
    avatar: "/avatar1.jpg",
    text: "Working with this agency has been transformative for our business. Their strategic approach and creative solutions exceeded all our expectations.",
    name: "Sarah Johnson",
    role: "CEO, TechFlow",
  },
  {
    id: 2,
    avatar: "/avatar2.jpg",
    text: "They delivered amazing results on our project. Communication and professionalism were top-notch.",
    name: "Michael Lee",
    role: "CTO, InnovateX",
  },
  {
    id: 3,
    avatar: "/avatar3.jpg",
    text: "Highly recommend! The team brought creativity and efficiency to every task we gave them.",
    name: "Emily Davis",
    role: "Product Manager, Creatify",
  },
];
const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => {
  return (
    <div className="box rounded-3xl bg-white lg:p-6  p-2 flex flex-col items-center justify-center gap-6 h-[352px] ">
      <div className="w-[76px] h-[76px] border-2 rounded-full overflow-hidden border-[#0808C1]">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <p className="text-[16px] text-[#364153] font-normal leading-[26px] tracking-[-0.312px] text-center w-[321px]">
          "{review.text}"
        </p>
      </div>
      <ul className="flex items-center flex-col">
        <li className="text-[#101828] text-[16px] font-normal leading-6 tracking-[-0.312px]">
          {review.name}
        </li>
        <li className="text-[#6A7282] text-[14px] font-normal leading-5 tracking-[-0.15px]">
          {review.role}
        </li>
      </ul>
    </div>
  );
};

export default ReviewCard;
