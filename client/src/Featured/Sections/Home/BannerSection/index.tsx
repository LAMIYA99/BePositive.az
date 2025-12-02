const BannerSection = () => {
  return (
<section className="relative w-full h-[600px] sm:h-[650px] md:h-[700px] lg:h-[750px] overflow-hidden flex justify-center items-center">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-center bg-cover bg-no-repeat scale-105"
    style={{
      backgroundImage: "url('/pexels.png')",
    }}
  ></div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 text-center">
    <h1
      data-aos="zoom-in-up"
      className="text-white text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[40px] sm:leading-[48px] md:leading-[56px] lg:leading-[66px] font-space-grotesk"
    >
      Be Positive Advertising Agency
    </h1>

    <p
      data-aos="zoom-in-up"
      data-aos-delay="300"
      className="text-white text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-light leading-[24px] sm:leading-[28px] md:leading-[32px] lg:leading-[38px]"
    >
      #BePositive - speak with colors, be remembered <br /> with your message!
    </p>
  </div>
</section>

  );
};

export default BannerSection;
