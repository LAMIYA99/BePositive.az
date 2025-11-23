import HeadingText from "../../Common/HeadingText";

const PlanSections = () => {
  return (
    <section className="container mx-auto max-w-[1440px]">
      <div className="flex items-center justify-center flex-col gap-10">
        <div
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1200"
        >
          <HeadingText title="Digital Marketing Plans" />
        </div>
        <div className="flex items-center gap-[21px]">
          <button className="h-14 px-8 py-2.5 rounded-2xl bg-[#0707B0] hover:bg-[#0707B0] duration-300 cursor-pointer text-white border border-transparent text-[20px] font-inter font-normal leading-6">
            Monthly
          </button>
          <button className="h-14 px-8 py-2.5 rounded-2xl bg-transparent text-black hover:bg-[#0707B0] hover:text-white duration-300 cursor-pointer border border-[#0808C1] text-[20px] font-inter font-normal leading-6">
            6 Month
          </button>
          <button className="h-14 px-8 py-2.5 rounded-2xl bg-transparent text-black hover:bg-[#0707B0] hover:text-white duration-300 cursor-pointer border border-[#0808C1] text-[20px] font-inter font-normal leading-6">
            Yearly
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-delay="500"
            data-aos-easing="ease-in-sine"
            className="free pl-[111px] pt-[82px] pb-[83px] pr-[27.538px] flex flex-col items-start justify-center rounded-3xl bg-white  shadow-[0_2px_12.4px_rgba(178,178,236,0.24)] group duration-400 cursor-pointer hover:bg-[#0808C1] hover:scale-[1.05]"
          >
            <h2 className="text-[#060689] font-space-grotesk text-[42px] font-bold leading-6 mb-[33px] group-hover:text-white duration-400">
              Free
            </h2>
            <p className="text-[#B2B2EC] text-[22px] mb-[57px] leading-7 font-medium font-space-grotesk">
              Unleash the power of Al documentation
            </p>
            <div className="mb-[35px]">
              <h3 className="text-[50px] font-medium font-space-grotesk leading-6 text-[#060689]   w-[188px] h-[30px] duration-400 group-hover:text-white">
                $0
                <span className="text-[20px] font-medium font-space-grotesk leading-6 text-[#060689] pl-8 group-hover:text-white duration-400">
                  / month
                </span>
              </h3>
            </div>

            <ul className="flex items-center justify-center flex-col gap-[15px] mb-[42px]">
              <li className="flex items-center justify-center gap-3.5">
                <span className="bg-[#DBFFE4] w-8 h-8 rounded-2xl p-1 flex items-center justify-center group-hover:bg-white duration-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className=" fill-[#449C4D] group-hover:fill-[#060689] duration-300"
                  >
                    <path d="M21 7.00009L9 19.0001L3.5 13.5001L4.91 12.0901L9 16.1701L19.59 5.59009L21 7.00009Z" />
                  </svg>
                </span>
                <h2 className="w-[126px] text-[20px] font-medium font-space-grotesk leading-[21px] text-[#8D8DE2] group-hover:text-white duration-400">
                  {" "}
                  Feature 1
                </h2>
              </li>
              <li className="flex items-center justify-center gap-3.5">
                <span className="bg-[#DBFFE4] w-8 h-8 rounded-2xl p-1 flex items-center justify-center group-hover:bg-white duration-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className=" fill-[#449C4D] group-hover:fill-[#060689] duration-300"
                  >
                    <path d="M21 7.00009L9 19.0001L3.5 13.5001L4.91 12.0901L9 16.1701L19.59 5.59009L21 7.00009Z" />
                  </svg>
                </span>
                <h2 className="w-[126px] text-[20px] font-medium font-space-grotesk leading-[21px] text-[#8D8DE2] group-hover:text-white duration-400">
                  {" "}
                  Feature 1
                </h2>
              </li>
              <li className="flex items-center justify-center gap-3.5">
                <span className="bg-[#DBFFE4] w-8 h-8 rounded-2xl p-1 flex items-center justify-center group-hover:bg-white duration-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className=" fill-[#449C4D] group-hover:fill-[#060689] duration-300"
                  >
                    <path d="M21 7.00009L9 19.0001L3.5 13.5001L4.91 12.0901L9 16.1701L19.59 5.59009L21 7.00009Z" />
                  </svg>
                </span>
                <h2 className="w-[126px] text-[20px] font-medium font-space-grotesk leading-[21px] text-[#8D8DE2] group-hover:text-white duration-400">
                  {" "}
                  Feature 1
                </h2>
              </li>
            </ul>
            <button className="w-[263px] h-16 p-2 flex items-center justify-center gap-3.5 rounded-[50px] group-hover:bg-white duration-400 cursor-pointer bg-[#E6E6F9] text-[#0808C1] font-inter font-medium leading-6">
              Get started for free
            </button>
          </div>
          <div
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-delay="300"
            data-aos-easing="ease-in-sine"
            className="free pl-[111px] pt-[82px] pb-[83px] transition-all pr-[27.538px] flex flex-col items-start justify-center rounded-3xl bg-white  shadow-[0_2px_12.4px_rgba(178,178,236,0.24)] group duration-400 cursor-pointer hover:bg-[#0808C1] hover:scale-[1.05]"
          >
            <h2 className="text-[#060689] font-space-grotesk text-[42px] font-bold leading-6 mb-[33px] group-hover:text-white duration-400">
              Professional
            </h2>
            <p className="text-[#B2B2EC] text-[22px] mb-[57px] leading-7 font-medium font-space-grotesk">
              Unleash the power of Al documentation
            </p>
            <div className="mb-[35px]">
              <h3 className="text-[50px] font-medium font-space-grotesk leading-6 text-[#060689]   w-[188px] h-[30px] duration-400 group-hover:text-white">
                $0
                <span className="text-[20px] font-medium font-space-grotesk leading-6 text-[#060689] pl-8 group-hover:text-white duration-400">
                  / month
                </span>
              </h3>
            </div>

            <ul className="flex items-center justify-center flex-col gap-[15px] mb-[42px]">
              <li className="flex items-center justify-center gap-3.5">
                <span className="bg-[#DBFFE4] w-8 h-8 rounded-2xl p-1 flex items-center justify-center group-hover:bg-white duration-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className=" fill-[#449C4D] group-hover:fill-[#060689] duration-300"
                  >
                    <path d="M21 7.00009L9 19.0001L3.5 13.5001L4.91 12.0901L9 16.1701L19.59 5.59009L21 7.00009Z" />
                  </svg>
                </span>
                <h2 className="w-[126px] text-[20px] font-medium font-space-grotesk leading-[21px] text-[#8D8DE2] group-hover:text-white duration-400">
                  {" "}
                  Feature 1
                </h2>
              </li>
              <li className="flex items-center justify-center gap-3.5">
                <span className="bg-[#DBFFE4] w-8 h-8 rounded-2xl p-1 flex items-center justify-center group-hover:bg-white duration-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className=" fill-[#449C4D] group-hover:fill-[#060689] duration-300"
                  >
                    <path d="M21 7.00009L9 19.0001L3.5 13.5001L4.91 12.0901L9 16.1701L19.59 5.59009L21 7.00009Z" />
                  </svg>
                </span>
                <h2 className="w-[126px] text-[20px] font-medium font-space-grotesk leading-[21px] text-[#8D8DE2] group-hover:text-white duration-400">
                  {" "}
                  Feature 1
                </h2>
              </li>
              <li className="flex items-center justify-center gap-3.5">
                <span className="bg-[#DBFFE4] w-8 h-8 rounded-2xl p-1 flex items-center justify-center group-hover:bg-white duration-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className=" fill-[#449C4D] group-hover:fill-[#060689] duration-300"
                  >
                    <path d="M21 7.00009L9 19.0001L3.5 13.5001L4.91 12.0901L9 16.1701L19.59 5.59009L21 7.00009Z" />
                  </svg>
                </span>
                <h2 className="w-[126px] text-[20px] font-medium font-space-grotesk leading-[21px] text-[#8D8DE2] group-hover:text-white duration-400">
                  {" "}
                  Feature 1
                </h2>
              </li>
            </ul>
            <button className="w-[263px] h-16 p-2 flex items-center justify-center gap-3.5 rounded-[50px] group-hover:bg-white duration-400 cursor-pointer bg-[#E6E6F9] text-[#0808C1] font-inter font-medium leading-6">
              Get started
            </button>
          </div>
          <div
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-delay="100"
            data-aos-easing="ease-in-sine"
            className="free pl-[111px] pt-[82px] pb-[83px] pr-[27.538px] flex flex-col items-start justify-center rounded-3xl bg-white  shadow-[0_2px_12.4px_rgba(178,178,236,0.24)] group duration-400 cursor-pointer hover:bg-[#0808C1] hover:scale-[1.05]"
          >
            <h2 className="text-[#060689] font-space-grotesk text-[42px] font-bold leading-6 mb-[33px] group-hover:text-white duration-400">
              Free
            </h2>
            <p className="text-[#B2B2EC] text-[22px] mb-[57px] leading-7 font-medium font-space-grotesk">
              Unleash the power of Al documentation
            </p>
            <div className="mb-[35px]">
              <h3 className="text-[50px] font-medium font-space-grotesk leading-6 text-[#060689]   w-[284px] h-[30px] duration-400 group-hover:text-white">
                Let’s chat
              </h3>
            </div>

            <ul className="flex items-center justify-center flex-col gap-[15px] mb-[42px]">
              <li className="flex items-center justify-center gap-3.5">
                <span className="bg-[#DBFFE4] w-8 h-8 rounded-2xl p-1 flex items-center justify-center group-hover:bg-white duration-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className=" fill-[#449C4D] group-hover:fill-[#060689] duration-300"
                  >
                    <path d="M21 7.00009L9 19.0001L3.5 13.5001L4.91 12.0901L9 16.1701L19.59 5.59009L21 7.00009Z" />
                  </svg>
                </span>
                <h2 className="w-[126px] text-[20px] font-medium font-space-grotesk leading-[21px] text-[#8D8DE2] group-hover:text-white duration-400">
                  {" "}
                  Feature 1
                </h2>
              </li>
              <li className="flex items-center justify-center gap-3.5">
                <span className="bg-[#DBFFE4] w-8 h-8 rounded-2xl p-1 flex items-center justify-center group-hover:bg-white duration-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className=" fill-[#449C4D] group-hover:fill-[#060689] duration-300"
                  >
                    <path d="M21 7.00009L9 19.0001L3.5 13.5001L4.91 12.0901L9 16.1701L19.59 5.59009L21 7.00009Z" />
                  </svg>
                </span>
                <h2 className="w-[126px] text-[20px] font-medium font-space-grotesk leading-[21px] text-[#8D8DE2] group-hover:text-white duration-400">
                  {" "}
                  Feature 1
                </h2>
              </li>
              <li className="flex items-center justify-center gap-3.5">
                <span className="bg-[#DBFFE4] w-8 h-8 rounded-2xl p-1 flex items-center justify-center group-hover:bg-white duration-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className=" fill-[#449C4D] group-hover:fill-[#060689] duration-300"
                  >
                    <path d="M21 7.00009L9 19.0001L3.5 13.5001L4.91 12.0901L9 16.1701L19.59 5.59009L21 7.00009Z" />
                  </svg>
                </span>
                <h2 className="w-[126px] text-[20px] font-medium font-space-grotesk leading-[21px] text-[#8D8DE2] group-hover:text-white duration-400">
                  {" "}
                  Feature 1
                </h2>
              </li>
            </ul>
            <button className="w-[263px] h-16 p-2 flex items-center justify-center gap-3.5 rounded-[50px] group-hover:bg-white duration-400 cursor-pointer bg-[#FEF7C3] text-[#0808C1] font-inter font-medium leading-6">
              Reques Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanSections;
