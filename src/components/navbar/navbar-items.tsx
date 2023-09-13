"use client";

import { NavbarMenuItems } from "@/constants/navbar-menu-items";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarItem } from "../next-ui-exports";
import Private from "../private";

export interface NavbatItemsListProps {}

export default function NavbarItemsList({}: NavbatItemsListProps) {
  const pathname = usePathname();

  return NavbarMenuItems.map((navItem, index) => {
    return navItem.private ? (
      <Private key={index} withLoading>
        <NavbarItem
          className={`${pathname.endsWith(navItem.path) && "text-primary-600"}`}
        >
          <Link color="foreground" href={navItem.path}>
            {navItem.name}
          </Link>
        </NavbarItem>
      </Private>
    ) : (
      <NavbarItem
        key={index}
        className={`${pathname.endsWith(navItem.path) && "text-primary-600"}`}
      >
        <Link color="foreground" href={navItem.path}>
          {navItem.name}
        </Link>
      </NavbarItem>
    );
  });
}
