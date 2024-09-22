"use client"
import React from "react";
import { AccountToggle } from "./AccountToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  const sidebarRoutes = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      name: 'Create',
      path: '/admin/create/product',
    },
    {
      name: 'Products',
      path: '/admin/products',
    },
    {
      name: 'Orders',
      path: '/admin/orders',
    },
    {
      name: 'Users',
      path: '/admin/users',
    },

  ]
  return (
    <div>
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)] ps-4 border-r border-r-slate-200">
        <AccountToggle />
        <div className="flex flex-col gap-4 mt-4 ">
          {
            sidebarRoutes.map((route, index) =>
              <Link href={route.path} key={`SIDEBAR_ROUTES_${index}}`} className={`${pathname === route.path ? 'bg-slate-200' : ''} rounded-md p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-600 transition-all duration-200`}>
                {route.name}
              </Link>
            )
          }
        </div>
      </div>

    </div>
  );
};
