
import Link from "next/link";

const BlogCard = () => {
  return (
    <div
      className="font-space group flex flex-col gap-[22px]
      p-6 rounded-3xl shadow-md transition-all duration-300 cursor-pointer
      bg-white hover:bg-[#0808C1] hover:text-white"
    >
      <div className="flex items-center mb-4">
        <img src="./Ellipse50.png" alt="" className="w-17 h-17 rounded-full" />
      </div>

      <div className="flex flex-col gap-3">
        <h3
          className="text-xl font-semibold 
          text-[#060689] group-hover:text-white"
        >
          Personalized Flight <br /> Alert
        </h3>

        <p className="text-[#B2B2EC] text-[16px] font-medium leading-[21px] group-hover:text-gray-200">
          enjoy seamless booking, smarter <br /> flight
        </p>

        <Link
          href="/BlogDetail"
          className="flex items-center gap-2 
            text-[16px] font-medium leading-[21px]
            text-[#0808C1] group-hover:text-white"
        >
          Learn more
          <svg
            className="group-hover:fill-white fill-[#0808C1]"
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="15"
            viewBox="0 0 13 15"
            fill="none"
          >
            <path d="M12.7071 8.07112C13.0976 7.6806 13.0976 7.04743 12.7071 6.65691L6.34315 0.292946C5.95262 -0.0975785 5.31946 -0.0975785 4.92893 0.292946C4.53841 0.68347 4.53841 1.31664 4.92893 1.70716L10.5858 7.36401L4.92893 13.0209C4.53841 13.4114 4.53841 14.0446 4.92893 14.4351C5.31946 14.8256 5.95262 14.8256 6.34315 14.4351L12.7071 8.07112ZM0 7.36401L0 8.36401H12V7.36401V6.36401H0L0 7.36401Z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
