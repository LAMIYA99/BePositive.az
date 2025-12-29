import type { FC, PropsWithChildren } from "react";
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
