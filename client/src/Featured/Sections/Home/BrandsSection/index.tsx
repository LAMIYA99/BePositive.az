const BrandSection = () => {
  const images = [
    "/Ellipse 51.png",
    "/Ellipse 60.png",
    "/Ellipse 61.png",
    "/Ellipse 62.png",
    "/Ellipse 64.png",
    "/Ellipse 65.png",
    "/Ellipse 66.png",
    "/Ellipse 67.png",
  ];

  return (
    <section data-aos="zoom-in-down" className="my-[72px] px-4 sm:px-6 md:px-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
        {images.map((src, index) => (
          <div
            key={index}
            className="bg-[#F5F7FA] rounded-[99px] flex justify-center items-center p-4"
          >
            <img
              src={src}
              alt=""
              className="w-[130px] h-[130px] object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandSection;
