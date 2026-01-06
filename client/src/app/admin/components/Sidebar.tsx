"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  FileText,
  ChevronRight,
  Briefcase,
  Star,
  GraduationCap,
  Bell,
  Building2,
  Users,
  HelpCircle,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  const menuItems = [
    {
      label: "Blog Posts",
      icon: <FileText className="w-5 h-5" />,
      href: "/admin",
    },
    {
      label: "Trainings",
      icon: <GraduationCap className="w-5 h-5" />,
      href: "/admin/trainings",
    },
    {
      label: "Services",
      icon: <Briefcase className="w-5 h-5" />,
      href: "/admin/services",
    },
    {
      label: "Reviews",
      icon: <Star className="w-5 h-5" />,
      href: "/admin/reviews",
    },
    {
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      href: "/admin/notifications",
    },
    {
      label: "Brands",
      icon: <Building2 className="w-5 h-5" />,
      href: "/admin/brands",
    },
    {
      label: "Team",
      icon: <Users className="w-5 h-5" />,
      href: "/admin/team",
    },
    {
      label: "FAQ",
      icon: <HelpCircle className="w-5 h-5" />,
      href: "/admin/faq",
    },
  ];

  return (
    <aside className="w-72 h-screen sticky top-0 bg-white border-r border-slate-100 p-8 hidden lg:flex flex-col">
      <div className="flex items-center flex-col gap-3 mb-12">
        <Link href={"/"}>
          <Image
            src="/Logo.png"
            alt="Logo"
            width={72}
            height={72}
            className="lg:w-[72px] lg:h-[72px] w-12 h-12 object-contain"
            priority
          />
        </Link>
        <h2 className="text-2xl font-semibold tracking-tight mb-2 text-[#171ACF]">
          Dashboard
        </h2>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <div
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-3xl transition-all ${
                pathname === item.href
                  ? "bg-violet-600 text-white shadow-xl shadow-violet-200 font-bold"
                  : "text-slate-400 hover:text-slate-900 hover:bg-slate-50 font-medium"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {pathname === item.href && (
                <ChevronRight className="ml-auto w-4 h-4" />
              )}
            </div>
          </Link>
        ))}
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-6 py-4 rounded-3xl text-rose-500 hover:bg-rose-50 transition-all font-bold"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
