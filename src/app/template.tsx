"use client";

import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";
export default function Template({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const pathname = usePathname();
  if (pathname === "/") {
    return (
      <div>
        <Navbar />
        {children}
      </div>
    );
  }
  if (pathname === "/login") {
    return <div>{children}</div>;
  }
  if (pathname === "/register") {
    return <div>{children}</div>;
  }
}
