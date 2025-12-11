import type { Metadata } from "next";
import type { NextLayoutIntlayer } from "next-intlayer";
import { getHTMLTextDir } from "intlayer";

import Layout from "@/Layout";
import AosInit from "../aos-init";
import { QueryProviders } from "@/Provider/QueryProviders";

const SITE_URL = "https://bepositive.az";
const SITE_NAME = "BePositive";
const DEFAULT_DESCRIPTION =
  "BePositive — mental sağlamlıq, xidmətlər, təlim və bloq məzmunu ilə istifadəçilərə dəstək verən platforma.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${SITE_URL}/${locale}`;

  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en`,
        az: `${SITE_URL}/az`,
      },
    },
    openGraph: {
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      url: canonical,
      siteName: SITE_NAME,
      locale,
      type: "website",
      images: [
        {
          url: "/Logo.png",
          width: 512,
          height: 512,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      images: ["/Logo.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <div lang={locale} dir={getHTMLTextDir(locale)} className="min-h-screen">
      <AosInit />
      <QueryProviders>
        <Layout>{children}</Layout>
      </QueryProviders>
    </div>
  );
};

export default LocaleLayout;
