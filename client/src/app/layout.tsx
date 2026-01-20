import type { FC, PropsWithChildren } from "react";
import Script from "next/script";

import { Inter } from "next/font/google";

import "./globals.css";
import { AppLoaderProvider } from "@/Provider/AppLoaderProvider";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

import { Toaster } from "react-hot-toast";
import { NotificationProvider } from "@/Provider/NotificationProvider";
import dynamic from "next/dynamic";

import PushNotificationClient from "@/components/PushNotificationClient";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#ECF0F6]`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KKHJR5PG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=8117850&fmt=gif"
          />
        </noscript>

        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KKHJR5PG');
        `}
        </Script>

        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
        _linkedin_partner_id = "8117850";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);

        (function(l) {
        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);})(window.lintrk);
        `}
        </Script>

        {}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16879322799"
          strategy="afterInteractive"
        />
        <Script id="google-ads">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-16879322799');
            `}
        </Script>

        {}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6Q30W25W0C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6Q30W25W0C');
            `}
        </Script>

        {/* reCAPTCHA v3 */}

        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />

        <Suspense fallback={null}>
          <AppLoaderProvider>
            <NotificationProvider>
              {children}
              <Toaster position="top-center" reverseOrder={false} />
              <PushNotificationClient />
            </NotificationProvider>
          </AppLoaderProvider>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
