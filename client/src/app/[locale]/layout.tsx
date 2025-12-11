import type { NextLayoutIntlayer } from "next-intlayer";
import { getHTMLTextDir } from "intlayer";
import { Inter, Poppins, Space_Grotesk } from "next/font/google";

import "../globals.css";
import "aos/dist/aos.css";
import Layout from "@/Layout";
import AosInit from "../aos-init";

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

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body
        className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} antialiased bg-[#ECF0F6]`}
      >
        <AosInit />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};

export default LocaleLayout;

