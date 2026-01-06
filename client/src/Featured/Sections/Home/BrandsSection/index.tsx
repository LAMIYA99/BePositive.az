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
          console.log("Fetched brands:", data.length);
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
      className="my-[10px] lg:my-[32px] py-8 w-full overflow-hidden"
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
            className="bg-white rounded-full mx-4 w-[110px] h-[110px] lg:w-[130px] lg:h-[130px] flex items-center justify-center shadow-md hover:shadow-lg transition-shadow shrink-0 overflow-hidden border border-slate-50"
          >
            <div className="relative w-[70px] h-[70px] lg:w-[90px] lg:h-[90px]">
              <Image
                src={getImageUrl(brand.imageUrl)}
                alt="brand logo"
                fill
                className="object-contain"
                loading="eager"
                unoptimized={true}
                sizes="(max-width: 1024px) 70px, 90px"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default BrandSection;
