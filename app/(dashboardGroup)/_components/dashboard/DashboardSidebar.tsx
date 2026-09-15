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
import { IUser } from "@/types/types";

type UserRole = string;

interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
}
type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

const DashboardSidebar = ({user}: {user: IUser}) => {
    console.log(user, "line 26")

  const pathname = usePathname();

  // Temporary role
  // Later replace this with the real logged-in user's role
  const userRole: UserRole = user?.data.role;
  console.log(userRole, "38")
  const commonMenu: MenuItem[] = [
    {
      title: "Dashboard",
      href: `/dashboard/${userRole.toLowerCase()}`,
      icon: LayoutDashboard,
    }
  ];

  const adminMenu: MenuItem[] = [
    {
      title: "User Management",
      href: "/dashboard/admin/users",
      icon: Users,
    }
  ];

  const landlordMenu: MenuItem[] = [
    {
      title: "My Properties",
      href: "/dashboard/landloard/properties",
      icon: Building2,
    },
    {
      title: "Rental Requests",
      href: "/dashboard/landloard/requests",
      icon: ClipboardList,
    }
  ];

  const tenantMenu: MenuItem[] = [
    
    {
      title: "My Requests",
      href: "/dashboard/tenant/requests",
      icon: ClipboardList,
    }
  ];

  const roleMenu =
    userRole === "Admin"
      ? adminMenu
      : userRole === "Landlord"
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