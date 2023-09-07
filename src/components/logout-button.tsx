"use client";

import { signOut } from "next-auth/react";
import { Button } from "./next-ui-exports";

export interface LogoutButtonProps {}

export default function LogoutButton({}: LogoutButtonProps) {
  const handleLogout = () => {
    signOut();
  };
  return (
    <div>
      <Button onClick={handleLogout}>Sair</Button>
    </div>
  );
}
