const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="container mx-auto grid grid-cols-12 font-inter">
        {/* LEFT — col-span-5 */}
        <div className="col-span-12  lg:col-span-5 ">
          {/* Logo */}
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

        {/* RIGHT — col-span-7 */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-end">
          {/* Navigation Links */}
   <div className="flex">
   <div className="flex justify-center lg:justify-end gap-10 mt-10 lg:mt-0 font-semibold text-lg">
            <a href="#">Home</a>
            <a href="#">About me</a>
            <a href="#">Services</a>
            <a href="#">Blog</a>
            <a href="#">FAQ</a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center lg:justify-end gap-4 mt-6">
            <img src="/instagram.png" className="w-7 h-7 cursor-pointer" />
            <img src="/linkedin.png" className="w-7 h-7 cursor-pointer" />
            <img src="/whatsapp.png" className="w-7 h-7 cursor-pointer" />
          </div>
   </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
