"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import LoadingIcon from "./loading-icon";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
  NavbarItem,
  User,
} from "./next-ui-exports";

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
      <LoadingIcon />
    </>
  ) : Boolean(user) ? (
    <NavbarContent justify="center" as="div" className="max-w-fit ">
      <Dropdown placement="bottom-end">
        <DropdownTrigger className="cursor-pointer rounded-lg px-2 py-2 hover:bg-primary-50">
          <div>
            <Avatar className="flex lg:hidden" src={user?.image} />
            <User
              className="hidden lg:flex"
              name={user?.name!.substring(0, 10)}
              description={`#${user?.profile.nickname.split("#")[1]}`}
              avatarProps={{
                src: user?.image,
              }}
            />
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          color="primary"
          variant="flat"
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
