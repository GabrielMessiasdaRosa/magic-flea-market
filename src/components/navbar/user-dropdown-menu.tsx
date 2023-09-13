"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarContent,
  NavbarItem,
  Spinner,
  User,
} from "../next-ui-exports";

export interface UserDropdownMenuProps {}

export default function UserDropdownMenu({}: UserDropdownMenuProps) {
  const { data, status } = useSession();
  const user = data?.user;
  const handleLogout = () => {
    signOut();
  };
  const handleCopyNicknameToClipboard = () => {
    navigator.clipboard.writeText(user?.profile.nickname!);
    toast.success("Nome de usuário copiado para a área de transferência");
  };

  return status === "loading" ? (
    <>
      <Spinner />
    </>
  ) : Boolean(user) ? (
    <NavbarContent justify="center" as="div" className="max-w-fit ">
      <Dropdown placement="bottom-end">
        <DropdownTrigger className="cursor-pointer rounded-full p-1 hover:bg-primary-50">
          <div>
            <Avatar className="flex lg:hidden" src={user?.image} />
            <Avatar className="hidden lg:flex" src={user?.image} />
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Custom item styles"
          disabledKeys={["profile"]}
          className="p-3"
          itemClasses={{
            base: [
              "rounded-md",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-default-100",
              "dark:data-[hover=true]:bg-default-50",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          }}
        >
          <DropdownSection aria-label="Profile & Actions" showDivider>
            <DropdownItem
              isReadOnly
              key="profile"
              className="h-14 gap-2 opacity-100"
            >
              <User
                classNames={{
                  base: "text-xs w-fit hover:bg-transparent",
                  description: "text-xs",
                  name: "text-xs",
                  wrapper: "flex flex-col justify-center",
                }}
                className="hidden lg:flex "
                name={user?.name!.substring(0, 10)}
                description={`#${user?.profile.nickname.split("#")[1]}`}
                avatarProps={{
                  src: user?.image,
                }}
              />
            </DropdownItem>
            <DropdownItem key="dashboard">Dashboard</DropdownItem>
            <DropdownItem key="settings">Settings</DropdownItem>
            <DropdownItem
              key="new_project"
              endContent={<PlusIcon className="w--6 h-6 text-large" />}
            >
              New Project
            </DropdownItem>
          </DropdownSection>

          <DropdownSection aria-label="Preferences" showDivider>
            <DropdownItem key="quick_search" shortcut="⌘K">
              Quick search
            </DropdownItem>
            <DropdownItem
              isReadOnly
              key="theme"
              className="cursor-default"
              endContent={
                <select
                  className="z-10 w-16 rounded-md border-small border-default-300 bg-transparent py-0.5 text-tiny text-default-500 outline-none group-data-[hover=true]:border-default-500 dark:border-default-200"
                  id="theme"
                  name="theme"
                >
                  <option>System</option>
                  <option>Dark</option>
                  <option>Light</option>
                </select>
              }
            >
              Theme
            </DropdownItem>
          </DropdownSection>

          <DropdownSection aria-label="Help & Feedback">
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout">Log Out</DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  ) : (
    <NavbarContent justify="center">
      <NavbarItem>
        <Button
          as={Link}
          radius="lg"
          color="primary"
          href="/login"
          variant="ghost"
        >
          Login
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
}
