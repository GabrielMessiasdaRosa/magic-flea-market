"use client";

import { Skeleton } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export interface PrivateProps {
  children: React.ReactNode | React.ReactNode[];
  withLoading?: boolean;
  callBackComponent?: React.ReactNode | React.ReactNode[];
}

export default function Private({
  children,
  withLoading,
  callBackComponent,
}: PrivateProps) {
  const { status, data } = useSession();
  if (status === "loading") {
    return withLoading ? (
      <Skeleton className="!h-fit !w-fit rounded-full">{children}</Skeleton>
    ) : (
      <>{callBackComponent}</>
    );
  }
  if (status === "unauthenticated") {
    return <>{callBackComponent}</>;
  }
  if (status === "authenticated" && !data?.user) {
    return <>{callBackComponent}</>;
  }
  if (status === "authenticated" && data?.user) {
    return <>{children}</>;
  }
}
