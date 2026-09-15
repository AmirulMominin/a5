"use client";

import Link from "next/link";
import {
  Home,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types/types";
import { logout } from "@/service/logOut";

type NavBarProps = {
  data: IUser | null; 
};

const NavBar = ({ data }: NavBarProps) => {
  const user = data?.data ?? null; 

  const dashboardPath =
    user?.role === "Admin"
      ? "/dashboard/admin"
      : user?.role === "Landlord"
        ? "/dashboard/landloard"
        : "/dashboard/tenant";

  const handleLogout = async() => {
    await logout()
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Home className="h-6 w-6" />
          <span>RentNest</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/properties" className="text-sm font-medium hover:text-primary">
            Properties
          </Link>
          
          <Link href="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger >
                <button
                  type="button"
                  className="flex h-10 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64">
                <div className="px-2 py-3">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{user.role}</p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem >
                  <Link href={dashboardPath} className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <button
                  type="button"
                  className="rounded-md px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  Login
                </button>
              </Link>

              <Link href="/registration">
                <button
                  type="button"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;