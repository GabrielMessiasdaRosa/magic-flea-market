"use client";

import { NavbarMenuItems } from "@/constants/navbar-menu-items";
import { NavbarUserItem } from "@/constants/navbar-user-Items";
import { logoutConfirmationModalStore } from "@/store/confirmation-modal-store";
import { mobileNavbarMenuStore } from "@/store/mobile-navbar-menu-store";
import {
  ArrowLeftCircleIcon,
  ChatBubbleOvalLeftIcon,
  CheckCircleIcon,
  ClipboardIcon,
  HomeIcon,
  QueueListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Divider,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  User,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import CardIcon from "../card-icon";
import Private from "../private";
import LogoutConfirmationModal from "./logout-confirmation-modal";

export interface MobileNavbarMenuProps {}

export default function MobileNavbarMenu({}: MobileNavbarMenuProps) {
  const { setIsConfirmationModalOpen } = logoutConfirmationModalStore();
  const { data, status } = useSession();
  const [copied, setCopied] = React.useState(false);
  const user = data?.user;
  const handleCopyNicknameToClipboard = () => {
    navigator.clipboard.writeText(user?.profile.nickname!);
    setCopied(true);
    toast.success("Nome de usuário copiado para a área de transferência");
    setTimeout(() => {
      return setCopied(false);
    }, 3000);
  };
  const pathname = usePathname();
  const { isOpen, setIsOpen } = mobileNavbarMenuStore();
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <NavbarContent className="lg:hidden" justify="end">
      <NavbarMenuToggle
        className="h-10 w-10 text-primary-50"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      />
      <NavbarMenu className=" bg-white scrollbar-hide ">
        <NavbarMenuItem className="flex flex-col gap-2">
          <div className="w-full pb-4 pt-3">
            <Link
              href={
                status === "authenticated" && user
                  ? "/market/new-announcement"
                  : "/login"
              }
            >
              <Button variant="solid" color="primary" className="h-12 w-full">
                Anunciar cartas
              </Button>{" "}
            </Link>
          </div>
          {NavbarMenuItems.map((item, index) => (
            <div key={`${item}-${index}`}>
              {item.private ? (
                <Private key={index} withLoading>
                  <Link
                    className={` ${
                      pathname.endsWith(item.path)
                        ? "bg-primary-50  text-primary-500"
                        : "text-primary-950"
                    } flex items-center gap-2 rounded-xl  p-2 active:bg-primary-50`}
                    href={item.path}
                  >
                    {
                      {
                        0: <HomeIcon className="h-4 w-4 text-primary-900/80" />,
                        1: <CardIcon className="h-4 w-4 text-primary-900/80" />,
                        2: (
                          <ChatBubbleOvalLeftIcon className="h-4 w-4 text-primary-900/80" />
                        ),
                        3: (
                          <QueueListIcon className="h-4 w-4 text-primary-900/80" />
                        ),
                      }[index]
                    }
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </Private>
              ) : (
                <Link
                  className={` ${
                    pathname.endsWith(item.path)
                      ? "bg-primary-50  text-primary-500"
                      : "text-primary-950"
                  } flex items-center gap-2 rounded-xl  p-2 active:bg-primary-50`}
                  href={item.path}
                >
                  {
                    {
                      0: <HomeIcon className="h-4 w-4 text-primary-900/80" />,
                      1: <CardIcon className="h-4 w-4 text-primary-900/80" />,
                      2: (
                        <ChatBubbleOvalLeftIcon className="h-4 w-4 text-primary-900/80" />
                      ),
                      3: (
                        <QueueListIcon className="h-4 w-4 text-primary-900/80" />
                      ),
                    }[index]
                  }
                  <span className="text-sm">{item.name}</span>
                </Link>
              )}
            </div>
          ))}
          <Divider />
        </NavbarMenuItem>
        <NavbarMenuItem className="min-h-1/4 flex flex-col items-start justify-start rounded-xl  p-2">
          <Private
            callBackComponent={
              <div className="mb-10 flex w-full items-center justify-center gap-6">
                <Link href={"/login"}>
                  <Button size="lg" variant="flat" color="secondary">
                    Login
                  </Button>
                </Link>{" "}
                <Link href={"/register"}>
                  <Button size="lg" variant="flat" color="primary">
                    Cadastre-se
                  </Button>
                </Link>
              </div>
            }
          >
            <div className="flex h-auto w-full flex-col">
              <div className="flex w-full flex-wrap  items-center justify-between gap-4">
                <div>
                  <User
                    name={user?.name!}
                    description={`#${user?.profile.nickname!.split("#")[1]}`}
                    avatarProps={{
                      src: user?.image!,
                    }}
                  />
                </div>
                <Button
                  variant="flat"
                  size="sm"
                  color={copied ? "success" : "primary"}
                  onClick={handleCopyNicknameToClipboard}
                  className="h-fit w-fit p-2"
                >
                  {copied ? (
                    <>
                      <span className="text-sm">Nickname copiado!</span>
                      <CheckCircleIcon className="h-4 w-4 text-success-600" />
                    </>
                  ) : (
                    <>
                      <span className="text-sm">Copiar Nickname</span>
                      <ClipboardIcon className="h-4 w-4 text-primary-900/80" />
                    </>
                  )}
                </Button>
              </div>
              <div className="flex w-full flex-col gap-2 py-2">
                {NavbarUserItem.map((item, index) => (
                  <div key={`${item}-${index}`}>
                    <Link
                      onClick={() => {
                        item.path === "/logout" &&
                          setIsConfirmationModalOpen(true);
                      }}
                      className={`cursor-pointer ${
                        pathname.endsWith(item.path)
                          ? "bg-primary-50  text-primary-500"
                          : item.path === "/logout"
                          ? "bg-danger-50/50 text-danger-800"
                          : "text-primary-950"
                      } flex items-center gap-2 rounded-xl  p-2 active:bg-primary-50`}
                      href={item.path === "/logout" ? "" : item.path}
                    >
                      {
                        {
                          0: (
                            <UserCircleIcon className="h-4 w-4 text-primary-900/80" />
                          ),
                          1: (
                            <ArrowLeftCircleIcon className="h-4 w-4 text-danger-600" />
                          ),
                        }[index]
                      }
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Private>
        </NavbarMenuItem>
      </NavbarMenu>
      <LogoutConfirmationModal />
      <Toaster />
    </NavbarContent>
  );
}
