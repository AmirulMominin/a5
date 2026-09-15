"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  ClipboardList,
  House,
  CreditCard,
  MessageSquare,
  Settings,
  UserRound,
} from "lucide-react";

type UserRole = "ADMIN" | "LANDLORD" | "TENANT";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const DashboardSidebar = ({user}) => {
    console.log(user, "26")
  const pathname = usePathname();

  // Temporary role
  // Later replace this with the real logged-in user's role
  const userRole: UserRole = user?.data.role;

  const commonMenu: MenuItem[] = [
    {
      title: "Dashboard",
      href: `/dashboard/${userRole.toLowerCase()}`,
      icon: LayoutDashboard,
    },
    {
      title: "Profile",
      href: `/dashboard/${userRole.toLowerCase()}/profile`,
      icon: UserRound,
    },
    {
      title: "Settings",
      href: `/dashboard/${userRole.toLowerCase()}/settings`,
      icon: Settings,
    },
  ];

  const adminMenu: MenuItem[] = [
    {
      title: "User Management",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "All Properties",
      href: "/dashboard/admin/properties",
      icon: Building2,
    },
    {
      title: "All Rentals",
      href: "/dashboard/admin/rentals",
      icon: ClipboardList,
    },
  ];

  const landlordMenu: MenuItem[] = [
    {
      title: "My Properties",
      href: "/dashboard/landlord/properties",
      icon: Building2,
    },
    {
      title: "Rental Requests",
      href: "/dashboard/landlord/requests",
      icon: ClipboardList,
    },
    {
      title: "My Earnings",
      href: "/dashboard/landlord/earnings",
      icon: CreditCard,
    },
  ];

  const tenantMenu: MenuItem[] = [
    {
      title: "Browse Properties",
      href: "/properties",
      icon: House,
    },
    {
      title: "My Requests",
      href: "/dashboard/tenant/requests",
      icon: ClipboardList,
    },
    {
      title: "My Rentals",
      href: "/dashboard/tenant/rentals",
      icon: Building2,
    },
    {
      title: "Payments",
      href: "/dashboard/tenant/payments",
      icon: CreditCard,
    },
    {
      title: "Reviews",
      href: "/dashboard/tenant/reviews",
      icon: MessageSquare,
    },
  ];

  const roleMenu =
    userRole === "ADMIN"
      ? adminMenu
      : userRole === "LANDLORD"
        ? landlordMenu
        : tenantMenu;

  const menuItems = [...commonMenu, ...roleMenu];

  return (
    <div className="flex h-full flex-col">
      {/* Sidebar heading */}
      <div className="border-b px-5 py-5">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          {userRole}
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardSidebar;