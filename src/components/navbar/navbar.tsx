import { logoutConfirmationModalStore } from "@/store/confirmation-modal-store";
import { navbarMenuStore } from "@/store/navbar-menu-store";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar as NUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import SearchInput from "../search-input";
import LogoutConfirmationModal from "./logout-confirmation-modal";
import MobileNavbarMenu from "./mobile-navbar-menu";
export interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  const { isOpen, setIsOpen } = navbarMenuStore();
  const { setIsConfirmationModalOpen } = logoutConfirmationModalStore();
  const { data, status } = useSession();
  return (
    <>
      <NUINavbar
        isBordered
        isBlurred
        height={"80px"}
        shouldHideOnScroll
        maxWidth="full"
        className="h-20 bg-primary-950 shadow-sm lg:h-16"
      >
        <NavbarContent justify="start" className="flex">
          <NavbarItem>
            <Link href="/" className="scale-90 lg:scale-100 ">
              <div
                className={`flex font-fancy  text-4xl text-primary-50 lg:text-5xl `}
              >
                <span className="-ml-2">M</span>
                <span className="-ml-2">F</span>
                <span className="-ml-2">M</span>
              </div>
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="center" className="flex">
          <NavbarItem className="invisible md:visible">
            <div className="scale-90 lg:scale-100 ">
              <SearchInput />
            </div>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="hidden lg:flex">
          <NavbarItem>
            <div className="scale-90 lg:scale-100">
              <div className="flex items-center gap-4">
                <Button className="text-white" color="primary">
                  Anunciar carta
                </Button>
                <Link className="cursor-pointer text-white" href="/market">
                  Mercado
                </Link>
                <Link className="cursor-pointer text-white" href="/cards">
                  Todas as cartas
                </Link>
                <Link className="cursor-pointer text-white" href="/chat">
                  Chat
                </Link>
              </div>
            </div>
          </NavbarItem>
          {status === "loading" ? (
            <div className="h-10 w-10" />
          ) : (
            <>
              {data?.user ? (
                <NavbarItem>
                  <div className="scale-90 text-white lg:scale-100">
                    <Dropdown>
                      <DropdownTrigger>
                        <Avatar
                          className="cursor-pointer"
                          onClick={() => setIsOpen(!isOpen)}
                          src={data.user.image}
                        />
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="edit">Minha Want list</DropdownItem>
                        <DropdownItem key="new" href="/settings">
                          Configuraçoes
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          onClick={() => setIsConfirmationModalOpen(true)}
                          className="text-danger"
                          color="danger"
                        >
                          Sair
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </NavbarItem>
              ) : (
                <Button
                  onClick={() => {
                    window.location.href = "/api/auth/signin";
                  }}
                >
                  Login
                </Button>
              )}
            </>
          )}
        </NavbarContent>

        <MobileNavbarMenu />

        <LogoutConfirmationModal />
        <Toaster />
      </NUINavbar>
      <div className="bg-primary-950 pb-2 md:hidden">
        <div className="scale-90 lg:scale-100">
          <SearchInput />
        </div>
      </div>
    </>
  );
}
