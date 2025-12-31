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
          setBrands(data);

      
          if (typeof window !== "undefined") {
            const AOS = (await import("aos")).default;
            setTimeout(() => {
              AOS.refresh();
            }, 100);
          }
        }
      } catch (error) {
        console.error("Failed to fetch brands", error);
      }
    };
    fetchBrands();
  }, []);

  if (brands.length === 0) {
    return null;
  }

  return (
    <section
      data-aos="zoom-in-down"
      className="my-[10px] lg:my-[62px] pt-4 overflow-hidden"
    >
      <Marquee speed={50} gradient={false} pauseOnHover={false} autoFill={true}>
        {brands.map((brand, index) => (
          <div
            key={brand._id || index}
            className="bg-white rounded-[99px] mx-4 w-[110px] h-[110px] lg:w-[130px] lg:h-[130px] flex items-center justify-center shadow-sm"
          >
            <div className="relative w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]">
              <Image
                src={getImageUrl(brand.imageUrl)}
                alt="brand logo"
                fill
                className="object-contain rounded-full"
                sizes="(max-width: 768px) 80px, 100px"
                loading="eager"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default BrandSection;
