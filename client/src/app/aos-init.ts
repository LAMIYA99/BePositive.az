"use client";
import { useEffect } from "react";
import AOS from "aos";

export default function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 800,  
      once: true,
    });
  }, []);

  return null;
}
