const BlogCard = () => {
    return (
      <div
        className="
          group p-12 rounded-3xl shadow-md transition-all duration-300 cursor-pointer
          bg-white hover:bg-[#0A18F9] hover:text-white
        "
      >
        {/* Avatar */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="./Ellipse50.png"
            alt=""
            className="w-12 h-12 rounded-full"
          />
        </div>
  
        {/* Title */}
        <h3
          className="
            text-xl font-semibold mb-2
            text-[#0A18F9] group-hover:text-white
          "
        >
          Personalized Flight Alert
        </h3>
  
        {/* Description */}
        <p className="text-gray-500 group-hover:text-gray-200">
          enjoy seamless booking, smarter flight
        </p>
  
        {/* Learn More */}
        <div
          className="
            mt-6 flex items-center gap-2 font-medium
            text-[#0A18F9] group-hover:text-white
          "
        >
          Learn more <span className="text-lg">➜</span>
        </div>
      </div>
    );
  };
  
  export default BlogCard;
  