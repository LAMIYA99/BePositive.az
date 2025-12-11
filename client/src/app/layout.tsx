import type { FC, PropsWithChildren } from "react";
import { Inter, Poppins, Space_Grotesk } from "next/font/google";

import "./globals.css";
import "aos/dist/aos.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} antialiased bg-[#ECF0F6]`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
