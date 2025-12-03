import React from "react";

const ContactSection = () => {
  const contacts = [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
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
      address: <>+994 10 533 01 29</>,
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="20"
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
      type: "Gmail",
      address: "info@bepositive.az",
    },
    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="34"
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
    <div className="mt-[72px] container mx-auto px-6">
      <div className="lg:bg-white py-10  rounded-3xl lg:shadow-[0_2px_12px_rgba(7,7,176,0.12)] shadow-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-[40px] sm:text-[48px] font-medium text-[#0808C1] leading-tight">
                Get in-
              </h2>
              <h3 className="text-[32px] sm:text-[40px] font-medium text-[#0808C1]">
                touch with us
              </h3>
            </div>

            {contacts.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                {item.icon}
                <div className="flex flex-col">
                  <h4 className="text-[16px] font-semibold">{item.type}</h4>
                  <p className="text-[15px] leading-6">{item.address}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="flex bg-white p-4 rounded-2xl flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[16px]">Name and surname</label>
              <input
                type="text"
                placeholder="Alamdar Manafov"
                className="w-full h-[55px] border border-[#0808C1] rounded-2xl px-4"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-[16px]">E-mail</label>
              <input
                type="email"
                placeholder="bepositive21@gmail.com"
                className="w-full h-[55px] border border-[#0808C1] rounded-2xl px-4"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-[16px]">
                What can help you?
              </label>
              <textarea
                placeholder="Hello, I want to learn ..."
                className="w-full h-[120px] border border-[#0808C1] rounded-2xl p-4"
              />
            </div>

            <button className="w-full h-[55px] bg-[#0707B0] text-white font-medium rounded-2xl hover:bg-[#FBE443] hover:text-black transition">
              Contact Me
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
