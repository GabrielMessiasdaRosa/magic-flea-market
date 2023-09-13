import { mobileNavbarMenuStore } from "@/store/mobile-navbar-menu-store";
import { Toaster } from "react-hot-toast";
import MfmBrandLogo from "../mfm-brand-logo";
import { Navbar as NUINavbar, NavbarContent } from "../next-ui-exports";
import MobileNavbarMenu from "./mobile-navbar-menu";
import NavbarDropdownMenu from "./navbar-dropdown-menu";
import SearchCollapsableInput from "./search-collapsable-input";
import UserDropdownMenu from "./user-dropdown-menu";
export interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  const { isOpen, setIsOpen } = mobileNavbarMenuStore();
  return (
    <NUINavbar
      isBordered
      isMenuOpen={isOpen}
      onMenuOpenChange={setIsOpen}
      isBlurred
      height={"100px"}
      shouldHideOnScroll
      maxWidth="full"
      className="h-36 shadow-sm lg:h-24"
    >
      <div className="flex h-fit  w-full flex-col items-center justify-between lg:flex-row">
        <div className="flex w-full items-center">
          <NavbarContent
            justify="start"
            className="flex flex-col items-center md:flex-row"
          >
            <NavbarContent justify="center" className="flex">
              <div className="scale-90 lg:scale-100 ">
                <MfmBrandLogo />
              </div>
            </NavbarContent>
            <div className="flex w-full items-center justify-evenly gap-2">
              <NavbarContent justify="start" className="xl:w-1/2">
                <div className="w-1/2">
                  <SearchCollapsableInput />
                </div>
              </NavbarContent>
              <NavbarContent justify="center" className="hidden lg:flex">
                <NavbarDropdownMenu />
              </NavbarContent>{" "}
              <NavbarContent justify="center" className="hidden lg:flex">
                <UserDropdownMenu />
              </NavbarContent>
              <NavbarContent justify="center" className="">
                <MobileNavbarMenu />
              </NavbarContent>
            </div>
          </NavbarContent>
        </div>
      </div>

      <Toaster />
    </NUINavbar>
  );
}
