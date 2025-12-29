"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
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
        const res = await fetch(`${API_URL}/api/brands`);
        if (res.ok) {
          const data = await res.json();
          setBrands(data);
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
    <section data-aos="zoom-in-down" className="my-[5px] lg:my-[62px] pt-4 ">
      <Marquee speed={50} gradient={false} pauseOnHover={false}>
        {brands.map((brand, index) => (
          <div
            key={brand._id || index}
            className="bg-[#F5F7FA] rounded-[99px] inline-block mx-4"
          >
            <Image
              src={getImageUrl(brand.imageUrl)}
              alt="brand logo"
              width={130}
              height={130}
              className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] object-cover"
              sizes="130px"
              loading="lazy"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default BrandSection;
