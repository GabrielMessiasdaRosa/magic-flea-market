import { signOut, useSession } from "next-auth/react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import MfmBrandLogo from "./mfm-brand-logo";
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
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "./next-ui-exports";
export interface NavbarProps {}
const menuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Deployments",
  "My Settings",
  "Team Settings",
  "Help & Feedback",
  "Log Out",
];
export default function Navbar({}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data } = useSession();
  const user = data?.user;
  const handleLogout = () => {
    signOut();
  };
  const handleCopyNicknameToClipboard = () => {
    navigator.clipboard.writeText(user?.profile.nickname!);
    toast.success("Nome de usuário copiado para a área de transferência");
  };

  return (
    <NUINavbar
      isBlurred
      height={"100px"}
      shouldHideOnScroll
      maxWidth="full"
      className="h-36 shadow-sm lg:h-24"
    >
      <div className="flex h-fit  w-full flex-col items-center justify-between lg:flex-row">
        <div className="scale-90 lg:scale-100 ">
          <MfmBrandLogo />
        </div>
        <div className="w-full">
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden"
            />

            <NavbarMenu className="flex flex-col">
              {Boolean(user) ? (
                menuItems.map((item, index) => (
                  <NavbarMenuItem key={`${item}-${index}`}>
                    <Link
                      color={
                        index === 2
                          ? "primary"
                          : index === menuItems.length - 1
                          ? "danger"
                          : "foreground"
                      }
                      className="w-full"
                      href="#"
                      size="lg"
                    >
                      {item}
                    </Link>
                  </NavbarMenuItem>
                ))
              ) : (
                <div className="mt-10 flex flex-col gap-4">
                  <NavbarMenuItem>
                    <Button
                      as={Link}
                      color="primary"
                      className="w-full"
                      href="/login"
                      variant="flat"
                    >
                      Login
                    </Button>
                  </NavbarMenuItem>
                  <span className="text-center text-default-500 dark:text-default-500/50">
                    ou
                  </span>
                  <NavbarMenuItem>
                    <Button
                      className="w-full"
                      as={Link}
                      color="secondary"
                      href="/register"
                      variant="flat"
                    >
                      Cadastre-se
                    </Button>
                  </NavbarMenuItem>
                </div>
              )}
            </NavbarMenu>

            {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}
            <NavbarContent className="" justify="end">
              {Boolean(user) ? (
                <NavbarContent as="div" className="max-w-fit " justify="end">
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="primary"
                        size="sm"
                        src={user?.image}
                      />
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Profile Actions"
                      color="primary"
                      variant="solid"
                      closeOnSelect={false}
                    >
                      <DropdownItem
                        as={"button"}
                        className={`h-14 gap-2 text-start transition-all`}
                        onClick={handleCopyNicknameToClipboard}
                      >
                        <p className="font-semibold">{user?.name}</p>
                        <p className="font-semibold">
                          {user?.profile.nickname.slice(user?.name.length)}
                        </p>
                      </DropdownItem>

                      {/*  <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem> */}
                      <DropdownItem
                        as={"button"}
                        onClick={handleLogout}
                        key="logout"
                        className="text-start"
                        color="danger"
                      >
                        Log Out
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavbarContent>
              ) : (
                <NavbarContent justify="end" className="max-w-fit ">
                  <NavbarItem>
                    <Button
                      as={Link}
                      color="primary"
                      href="/login"
                      variant="ghost"
                    >
                      Login
                    </Button>
                  </NavbarItem>
                </NavbarContent>
              )}
            </NavbarContent>
          </NavbarContent>
        </div>
      </div>

      <Toaster />
    </NUINavbar>
  );
}
