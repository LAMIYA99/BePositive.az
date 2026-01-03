import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AdminLayout from "@/Layout/AdminLayout/layout";
import AdminAuthGuard from "./AuthGuard";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
    <div className={`${inter.variable} antialiased`}>
      <AdminAuthGuard>
        <AdminLayout>{children}</AdminLayout>
      </AdminAuthGuard>
    </div>
  );
}
