"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppLoading } from "@/Provider/AppLoaderProvider";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { setLoading } = useAppLoading();

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    const isAuth = auth === "true";

    if (pathname === "/admin/login") {
      if (isAuth) {
        router.push("/admin");
      } else {
        setIsAuthenticated(true);
      }
      return;
    }

    if (isAuth) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/admin/login");
    }
  }, [pathname, router]);

  // Show nothing or a loader while checking auth
  if (isAuthenticated === null && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
