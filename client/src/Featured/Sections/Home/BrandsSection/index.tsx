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
    <section data-aos="zoom-in-down" className="my-[72px]">
      <Marquee speed={50} gradient={false} pauseOnHover={false}>
        {images.map((src, index) => (
          <div
            key={index}
            className="bg-[#F5F7FA] rounded-[99px] inline-block mx-4"
          >
            <img
              src={src}
              alt=""
              className="w-[130px] h-[130px] object-cover"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default BrandSection;
