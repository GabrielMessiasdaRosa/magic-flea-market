import { NavbarMenuItems } from "@/constants/navbar-menu-items";
import { mobileNavbarMenuStore } from "@/store/mobile-navbar-menu-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  User,
} from "./next-ui-exports";

export interface MobileNavbarMenuProps {}

export default function MobileNavbarMenu({}: MobileNavbarMenuProps) {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = mobileNavbarMenuStore();
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <>
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle
          className=" h-10 w-10"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarMenu className="mt-11 bg-primary-50">
        {NavbarMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === NavbarMenuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={item.path}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="flex h-1/4 flex-col items-start justify-start rounded-xl border border-primary-300 p-2">
          <User
            name="Teste"
            description="#1234"
            avatarProps={{
              src: "https://avatars.githubusercontent.com/u/55935997?v=4",
            }}
          />
        </NavbarMenuItem>
      </NavbarMenu>
    </>
  );
}
