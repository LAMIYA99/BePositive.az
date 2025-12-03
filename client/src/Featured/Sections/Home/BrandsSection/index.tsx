import Marquee from "react-fast-marquee";

const BrandSection = () => {
  const images = [
    "/Ellipse 51.png",
    "/Ellipse 60.png",
    "/Ellipse 61.png",
    "/Ellipse 62.png",
    "/Ellipse 64.png",
    "/Ellipse 65.png",
    "/Ellipse 61.png",
    "/Ellipse 66.png",
    "/Ellipse 62.png",
    "/Ellipse 64.png",
    "/Ellipse 67.png",
  ];

  return (
    <section data-aos="zoom-in-down" className="my-[72px] px-6">
      {/* MOBILE – 2 sütun */}
      <div className="grid grid-cols-2 gap-6 sm:hidden">
        {images.map((src, index) => (
          <div
            key={index}
            className="bg-[#F5F7FA] rounded-[99px] p-4 flex justify-center"
          >
            <img src={src} className="w-16 h-16 object-cover" />
          </div>
        ))}
      </div>

      {/* TABLET – 4 sütun */}
      <div className="hidden sm:grid md:hidden grid-cols-4 gap-[28.5px]">
        {images.slice(0, 8).map((src, index) => (
          <div
            key={index}
            className="bg-[#F5F7FA] rounded-full  flex items-center justify-center"
          >
            <img src={src} className="w-16 h-16 object-cover" />
          </div>
        ))}
      </div>

      {/* DESKTOP – Marquee */}
      <div className="hidden md:block">
        <Marquee speed={50} gradient={false} pauseOnHover={false}>
          {images.map((src, index) => (
            <div
              key={index}
              className="bg-[#F5F7FA] rounded-[99px] mx-4 p-4 flex justify-center"
            >
              <img src={src} className="w-[130px] h-[130px] object-cover" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default BrandSection;
