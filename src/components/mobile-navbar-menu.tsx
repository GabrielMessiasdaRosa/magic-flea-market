import { NavbarMenuItems } from "@/constants/navbar-menu-items";
import { mobileNavbarMenuStore } from "@/store/mobile-navbar-menu-store";
import Link from "next/link";
import {
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "./next-ui-exports";

export interface MovileNavbarMenuProps {}

export default function MovbileNavbarMenu({}: MovileNavbarMenuProps) {
  const { isOpen, setIsOpen } = mobileNavbarMenuStore();
  return <></>;
}
