import React from "react";

const ContactSection = () => {
  const contacts = [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="29"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M4.25 0.75H11.25L14.75 9.5L10.375 12.125C12.2492 15.9252 15.3248 19.0008 19.125 20.875L21.75 16.5L30.5 20V27C30.5 27.9283 30.1313 28.8185 29.4749 29.4749C28.8185 30.1313 27.9283 30.5 27 30.5C20.1737 30.0852 13.7353 27.1864 8.89945 22.3506C4.06363 17.5147 1.16484 11.0763 0.75 4.25C0.75 3.32174 1.11875 2.4315 1.77513 1.77513C2.4315 1.11875 3.32174 0.75 4.25 0.75Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      type: "Phone",
      address: "+994 10 533 01 29",
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="24"
          viewBox="0 0 33 26"
          fill="none"
        >
          <path
            d="M0.75 4.25C0.75 3.32174 1.11875 2.4315 1.77513 1.77513C2.4315 1.11875 3.32174 0.75 4.25 0.75H28.75C29.6783 0.75 30.5685 1.11875 31.2249 1.77513C31.8813 2.4315 32.25 3.32174 32.25 4.25M0.75 4.25V21.75C0.75 22.6783 1.11875 23.5685 1.77513 24.2249C2.4315 24.8813 3.32174 25.25 4.25 25.25H28.75C29.6783 25.25 30.5685 24.8813 31.2249 24.2249C31.8813 23.5685 32.25 22.6783 32.25 21.75V4.25M0.75 4.25L16.5 14.75L32.25 4.25"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      type: "Email",
      address: "info@bepositive.az",
    },
    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="39"
          viewBox="0 0 34 39"
          fill="none"
        >
          <path
            d="M10.75 16.7494C10.75 18.3407 11.3821 19.8668 12.5074 20.9921C13.6326 22.1173 15.1587 22.7494 16.75 22.7494C18.3413 22.7494 19.8674 22.1173 20.9926 20.9921C22.1179 19.8668 22.75 18.3407 22.75 16.7494C22.75 15.1581 22.1179 13.632 20.9926 12.5068C19.8674 11.3816 18.3413 10.7494 16.75 10.7494C15.1587 10.7494 13.6326 11.3816 12.5074 12.5068C11.3821 13.632 10.75 15.1581 10.75 16.7494Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28.064 28.0634L19.578 36.5494C18.828 37.2987 17.8112 37.7196 16.751 37.7196C15.6908 37.7196 14.674 37.2987 13.924 36.5494L5.43601 28.0634C3.19845 25.8257 1.67468 22.9748 1.05738 19.8711C0.440086 16.7675 0.756987 13.5504 1.96801 10.6269C3.17904 7.70331 5.2298 5.20449 7.86097 3.44643C10.4921 1.68836 13.5855 0.75 16.75 0.75C19.9145 0.75 23.0079 1.68836 25.639 3.44643C28.2702 5.20449 30.321 7.70331 31.532 10.6269C32.743 13.5504 33.0599 16.7675 32.4426 19.8711C31.8253 22.9748 30.3016 25.8257 28.064 28.0634Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      type: "Adress",
      address: "Azerbaijan, Baku, Fuad Ibrahimbayov 13.",
    },
  ];
  return (
    <div className="mt-[72px] container mx-auto">
      <div className="bg-white py-[54px] px-[46px] rounded-3xl shadow[box-shadow: 0 2px 12.9px 0 rgba(7, 7, 176, 0.12);]">
        <div className="grid grid-cols-2">
          <div className="left flex flex-col items-start gap-[46px] justify-between">
            <div className="flex items-start flex-col gap-3">
              <h2 className="text-[88px] font-inter text-[#0808C1] font-medium leading-[106px]">
                Get in-
              </h2>
              <h3 className="text-[#0808C1] leading-14  text-[48px] font-medium">
                touch with us
              </h3>
            </div>
            {contacts &&
              contacts.map((item) => (
                <div key={item?.id}>
                  <div className="flex items-center gap-3">
                    {item?.icon}
                    <div className="flex items-start gap-1 flex-col">
                      <h2 className="text-black text-[16px] font-inter font-semibold leading-6">
                        {item?.type}
                      </h2>
                      <p className="text-black text-[16px] font-inter font-normal leading-[26px]">
                        {item?.address}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="right flex items-center justify-end">
            <form>
              <div className="flex flex-col gap-2 mb-3">
                <label className="text-[18px] font-inter font-bold leading-6 text-[#101010]">
                  Name and surname
                </label>
                <div className="w-[484px] h-[60px]  border border-[#0808C1] rounded-2xl flex items-center justify-start  p-2 pl-[34px]">
                  <input
                    className=" outline-none w-[327px] text-[#BDBDBD] text-[16px] font-normal leading-6 font-inter "
                    type="text"
                    placeholder="Alamdar Manafov"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2  mb-3">
                <label className="text-[18px] font-inter font-bold leading-6 text-[#101010]">
                  E-mail
                </label>
                <div className="w-[484px] h-[60px]  border border-[#0808C1] rounded-2xl flex items-center justify-start  p-2 pl-[34px]">
                  <input
                    className=" outline-none w-[327px] text-[#BDBDBD] text-[16px] font-normal leading-6 font-inter "
                    type="email"
                    placeholder="bepositive21@gmail.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2  mb-3">
                <label className="text-[18px] font-inter font-bold leading-6 text-[#101010]">
                  What can help you?
                </label>
                <div className="w-[484px] h-[120px]  border border-[#0808C1] rounded-2xl flex items-center justify-start  p-2 pl-[34px]">
                  <input
                    className=" outline-none w-[327px] text-[#BDBDBD] text-[16px] font-normal leading-6 font-inter "
                    type="text"
                    placeholder="Hello, I want to learn ..."
                  />
                </div>
              </div>
              <button className="w-[484px] mt-10 h-[60px] px-[166px] py-2.5 rounded-2xl bg-[#0707B0] text-white text-[16px] font-medium leading-[150%] capitalize font-inter hover:bg-[#FBE443] duration-300 cursor-pointer hover:text-black">
                Contact me
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
