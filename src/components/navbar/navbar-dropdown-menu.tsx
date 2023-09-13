"use client";

import { logoutConfirmationModalStore } from "@/store/confirmation-modal-store";
import { mobileNavbarMenuStore } from "@/store/mobile-navbar-menu-store";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "../next-ui-exports";

export interface NavbarDropdownMenuProps {}

export default function NavbarDropdownMenu({}: NavbarDropdownMenuProps) {
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
    <Dropdown
      showArrow
      classNames={{
        base: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
        arrow: "bg-default-200",
      }}
    >
      <DropdownTrigger>
        <div className="flex cursor-pointer items-center">
          <Square2StackIcon className="h-14 w-12 p-1 text-primary-800 hover:text-primary-800/70" />
        </div>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownSection title="Actions">
          <DropdownItem key="new" shortcut="⌘N" description="Create a new file">
            New file
          </DropdownItem>
          <DropdownItem
            key="copy"
            shortcut="⌘C"
            description="Copy the file link"
          >
            Copy link
          </DropdownItem>
          <DropdownItem
            key="edit"
            shortcut="⌘⇧E"
            description="Allows you to edit the file"
          >
            Edit file
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            shortcut="⌘⇧D"
            description="Permanently delete the file"
          >
            Delete file
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
