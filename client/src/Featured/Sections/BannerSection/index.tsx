const BannerSection = () => {
  return (
    <section className="relative w-full h-[750px] overflow-hidden flex justify-center items-center">
      <div
     
        className="absolute inset-0 bg-center bg-cover bg-no-repeat scale-102 "
        style={{
          backgroundImage: "url('/pexels.png')",
        }}
      ></div>

      <div className="absolute inset-0 bg-[#00000075]"></div>

      <div className="relative flex flex-col items-center gap-8  ">
        <h1
          data-aos="zoom-in-up"
          className="text-[#FFF] text-[56px]  font-bold leading-[66px] font-space-grotesk"
        >
          Be Positive Advertising Agency
        </h1>

        <p
          data-aos="zoom-in-up"
          data-aos-delay="300"
          className="text-white text-[28px] text-center font-light leading-[38px]"
        >
          #BePositive - speak with colors, be remembered <br /> with your
          message!
        </p>
      </div>
    </section>
  );
};

export default BannerSection;
