"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";
import { getImageUrl } from "@/lib/utils";

interface Brand {
  _id: string;
  imageUrl: string;
}

const BrandSection = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(`/api/brands`);
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched brands:", data.length); // DEBUG
          setBrands(data);
        } else {
          console.error("Failed to fetch brands, status:", res.status);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (brands.length > 0 && typeof window !== "undefined") {
      import("aos").then(({ default: AOS }) => {
        setTimeout(() => AOS.refresh(), 200);
      });
    }
  }, [brands]);

  if (brands.length === 0) {
    return null;
  }

  return (
    <section
      data-aos="zoom-in-down"
      className="my-[10px] lg:my-[62px] pt-4 w-full overflow-hidden"
    >
      <Marquee
        speed={50}
        gradient={false}
        pauseOnHover={false}
        autoFill={true}
        key={brands.length} 
      >
        {brands.map((brand, index) => (
          <div
            key={`${brand._id}-${index}`}
            className="bg-white rounded-full mx-4 w-[110px] h-[110px] lg:w-[130px] lg:h-[130px] flex items-center justify-center shadow-sm shrink-0"
          >
            <div className="relative w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]">
              <Image
                src={getImageUrl(brand.imageUrl)}
                alt="brand logo"
                fill
                className="object-contain"
                loading="eager"
                unoptimized={brand.imageUrl?.endsWith(".svg")}
                sizes="130px"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default BrandSection;
