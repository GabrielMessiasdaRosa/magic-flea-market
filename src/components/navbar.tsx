import { mobileNavbarMenuStore } from "@/store/mobile-navbar-menu-store";
import { Toaster } from "react-hot-toast";
import MfmBrandLogo from "./mfm-brand-logo";
import MobileNavbarMenu from "./mobile-navbar-menu";
import NavbarItemsList from "./navbar-items";
import { Button, Navbar as NUINavbar, NavbarContent } from "./next-ui-exports";
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
              <NavbarContent justify="start" className="lg:w-1/2">
                <SearchCollapsableInput />
              </NavbarContent>

              <NavbarContent
                justify="start"
                className="hidden gap-4 px-8 lg:flex"
              >
                <NavbarItemsList />
              </NavbarContent>

              <NavbarContent justify="center" className="hidden lg:flex">
                <Button radius="lg" color="primary" variant="solid">
                  Anunciar cartas
                </Button>
              </NavbarContent>

              <NavbarContent justify="center" className="hidden lg:flex">
                <UserDropdownMenu />
              </NavbarContent>

              <NavbarContent justify="center" className="flex lg:hidden">
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
