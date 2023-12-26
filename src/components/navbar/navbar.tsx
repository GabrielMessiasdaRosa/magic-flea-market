import { mobileNavbarMenuStore } from "@/store/mobile-navbar-menu-store";
import { Navbar as NUINavbar, NavbarContent } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import MobileNavbarMenu from "./mobile-navbar-menu";
export interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  const { isOpen, setIsOpen } = mobileNavbarMenuStore();
  return (
    <NUINavbar
      isBordered
      isMenuOpen={isOpen}
      onMenuOpenChange={setIsOpen}
      isBlurred
      height={"80px"}
      shouldHideOnScroll
      maxWidth="full"
      className="h-20 bg-primary-950 shadow-sm lg:h-16"
    >
      <NavbarContent justify="start" className="flex">
        <div className="scale-90 lg:scale-100 ">
          <div className={`flex font-fancy text-5xl text-primary-50 `}>
            <span className="-ml-2">M</span>
            <span className="-ml-2">F</span>
            <span className="-ml-2">M</span>
          </div>
        </div>
      </NavbarContent>
      <MobileNavbarMenu />

      <Toaster />
    </NUINavbar>
  );
}
