"use client";

import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";
export default function Template({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const pathname = usePathname();
  const isLoginContext =
    pathname.includes("/recovery/request-new-password") ||
    pathname.includes("/recovery/set-new-password") ||
    pathname.includes("/login") ||
    pathname.includes("/register");
  if (isLoginContext) {
    return <div>{children}</div>;
  }
  if (pathname === "/") {
    return (
      <div>
        <Navbar />
        {children}
      </div>
    );
  }
}
