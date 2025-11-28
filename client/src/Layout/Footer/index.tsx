const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="container mx-auto grid grid-cols-12 gap-20 font-inter">
        <div className="col-span-12  lg:col-span-5 ">
          <div className="flex flex-col gap-9">
            <div>
              <img
                src="./LogoFooter.png"
                alt="logo"
                className="w-[94px] h-[95px] object-contain"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Contact</h2>

              <div className="text-[16px] flex flex-col gap-4 font-normal leading-6">
                <div className="flex flex-col gap-0.5">
                  <p>+994 10 533 01 29</p>
                  <p>+994 10 531 01 29</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p>info@bepositive.az</p>
                  <p>Azerbaijan, Baku, Fuad Ibrahimayov 13.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-end">

{/* LINKLƏR — ortada */}
<div className="flex items-end justify-between ">
<div className="flex justify-center gap-10  font-semibold text-lg">
  <a href="#">Home</a>
  <a href="#">About me</a>
  <a href="#">Services</a>
  <a href="#">Blog</a>
  <a href="#">FAQ</a>
</div>

{/* SOCIAL ICONS — sağ aşağı hissədə */}
<div className="flex justify-center lg:justify-end gap-4 ">

  {/* Instagram */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
  >
    <path
      d="M18.5625 8.4375V8.44875M4.5 9C4.5 7.80653 4.97411 6.66193 5.81802 5.81802C6.66193 4.97411 7.80653 4.5 9 4.5H18C19.1935 4.5 20.3381 4.97411 21.182 5.81802C22.0259 6.66193 22.5 7.80653 22.5 9V18C22.5 19.1935 22.0259 20.3381 21.182 21.182C20.3381 22.0259 19.1935 22.5 18 22.5H9C7.80653 22.5 6.66193 22.0259 5.81802 21.182C4.97411 20.3381 4.5 19.1935 4.5 18V9ZM10.125 13.5C10.125 14.3951 10.4806 15.2536 11.1135 15.8865C11.7464 16.5194 12.6049 16.875 13.5 16.875C14.3951 16.875 15.2536 16.5194 15.8865 15.8865C16.5194 15.2536 16.875 14.3951 16.875 13.5C16.875 12.6049 16.5194 11.7464 15.8865 11.1135C15.2536 10.4806 14.3951 10.125 13.5 10.125C12.6049 10.125 11.7464 10.4806 11.1135 11.1135C10.4806 11.7464 10.125 12.6049 10.125 13.5Z"
      stroke="black"
      strokeWidth="1.5"
    />
  </svg>

  {/* LinkedIn */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
  >
    <path
      d="M5.25 8.25V15.25M9.25 11.25V15.25M9.25 11.25C9.25 10.856 9.3276 10.4659 9.47836 10.1019C9.62913 9.73797 9.8501 9.40726 10.1287 9.12868C10.4073 8.8501 10.738 8.62913 11.1019 8.47836C11.4659 8.3276 11.856 8.25 12.25 8.25C12.644 8.25 13.0341 8.3276 13.3981 8.47836C13.762 8.62913 14.0927 8.8501 14.3713 9.12868C14.6499 9.40726 14.8709 9.73797 15.0216 10.1019C15.1724 10.4659 15.25 10.856 15.25 11.25V15.25M9.25 11.25V8.25"
      stroke="black"
      strokeWidth="1.5"
    />
  </svg>

  {/* WhatsApp */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M9 9.99976C9 11.3258 9.52678 12.5976 10.4645 13.5353C11.4021 14.473 12.6739 14.9998 14 14.9998M3 20.9997L4.65 17.1997C3.38766 15.4078 2.82267 13.2168 3.06104 11.0378C3.29942 8.8589 4.32479 6.84186 5.94471 5.36525C7.56463 3.88863 9.66775 3.05394 11.8594 3.01782C14.051 2.98171 16.1805 3.74665 17.8482 5.1691C19.5159 6.59154 20.6071 8.5737 20.9172 10.7436C21.2272 12.9135 20.7347 15.1219 19.5321 16.9545C18.3295 18.7871 16.4994 20.1177 14.3854 20.6968C12.2713 21.2759 10.0186 21.0636 8.05 20.0997L3 20.9997Z"
      stroke="black"
      strokeWidth="1.5"
    />
  </svg>
</div>
</div>
</div>

      </div>
    </footer>
  );
};

export default Footer;
