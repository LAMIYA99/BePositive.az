import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import AdminLayout from "@/Layout/AdminLayout/layout";
import AdminAuthGuard from "./AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel | BePositive",
  description: "Secure administrative dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <AdminAuthGuard>
        <AdminLayout>{children}</AdminLayout>
      </AdminAuthGuard>
    </div>
  );
}
