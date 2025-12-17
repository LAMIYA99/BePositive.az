export const ServicesCard = () => {
  const img = "./cart.png";
  const tags = ["Dashboard", "Saas", "Product"];

  return (
    <div className="relative h-[280px] sm:h-[300px] md:h-[334px] rounded-2xl overflow-hidden group cursor-pointer shadow-md bg-gray-200">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${img})` }}
      />

      <div
        className="absolute flex flex-col gap-4 bottom-0 left-0 w-full 
          p-4 sm:p-5 md:p-6
          text-white 
          bg-linear-to-t from-black/80 to-transparent
          translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-500 space-y-3"
      >
        <div className="flex gap-2 sm:gap-3">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="
                flex justify-center items-center 
                w-[65px] h-7 text-[10px] 
                sm:w-[75px] sm:h-7 sm:text-[11px]
                md:w-[85px] md:h-8 md:text-[12px]
                px-5 sm:px-7 md:px-[35px]
                leading-5 sm:leading-[22px] md:leading-[26px]
                border border-white rounded-full font-medium backdrop-blur-sm
              "
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="relative">
          <p
            className="
          text-[16px] leading-5
          sm:text-[20px] sm:leading-[22px]
          md:text-[26px] md:leading-[26px]
          font-medium
        "
          >
            Mediani Pro – Social Media <br className="hidden sm:block" />{" "}
            Automation Dashboard
          </p>
        <div className="absolute top-0 right-0">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="
              w-6 h-6 
              sm:w-8 sm:h-8 
              md:w-[41px] md:h-[41px]
            "
            viewBox="0 0 41 41"
            fill="none"
          >
            <path
              d="M40.5651 1.49997C40.5651 0.671545 39.8935 -2.80897e-05 39.0651 -2.91434e-05L25.5651 -2.72889e-05C24.7367 -2.86376e-05 24.0651 0.671545 24.0651 1.49997C24.0651 2.3284 24.7367 2.99997 25.5651 2.99997L37.5651 2.99997L37.5651 15C37.5651 15.8284 38.2367 16.5 39.0651 16.5C39.8935 16.5 40.5651 15.8284 40.5651 15L40.5651 1.49997ZM1.06055 39.5045L2.12121 40.5652L40.1258 2.56063L39.0651 1.49997L38.0044 0.439311L-0.000113279 38.4439L1.06055 39.5045Z"
              fill="white"
            />
          </svg>
        </div>
        </div>
      </div>
    </div>
  );
};
