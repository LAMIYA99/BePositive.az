export const ServicesCard = () => {
  const img = "./cart.png";
  const tags = ["Dashboard", "Saas", "Product"];

  return (
    <div className="relative h-[300px] rounded-2xl overflow-hidden group cursor-pointer shadow-md bg-gray-200">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${img})` }}
      />

      <div
        className="absolute bottom-0 left-0 w-full p-6 text-white bg-gradient-to-t from-black/80 to-transparent
    translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
    transition-all duration-500 space-y-3"
      >
        <div className="flex gap-3">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-4 py-1 border border-white/50 rounded-full text-sm backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-[26px] font-normal leading-[26px] ">
          Mediani Pro – Social Media Automation Dashboard
        </p>

        <div className="absolute bottom-6 right-6 text-white text-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          ➜
        </div>
      </div>
    </div>
  );
};
