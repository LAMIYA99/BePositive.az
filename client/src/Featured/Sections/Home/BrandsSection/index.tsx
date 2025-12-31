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
      className="my-[20px] lg:my-[60px] py-6 w-full overflow-hidden relative flex items-center min-h-[140px] lg:min-h-[180px]"
    >
      <Marquee
        speed={40}
        gradient={false}
        pauseOnHover={false}
        autoFill={true}
        key={brands.length}
      >
        {brands.map((brand, index) => (
          <div
            key={`${brand._id}-${index}`}
            className="bg-white rounded-full mx-6 w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] flex items-center justify-center shadow-md shrink-0"
          >
            <div className="relative w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]">
              <Image
                src={getImageUrl(brand.imageUrl)}
                alt={`brand-${index}`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 70px, 100px"
                unoptimized
                priority={index < 5}
              />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default BrandSection;
