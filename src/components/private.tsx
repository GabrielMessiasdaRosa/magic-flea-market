"use client";

import { useSession } from "next-auth/react";
import { Skeleton } from "./next-ui-exports";

export interface PrivateProps {
  children: React.ReactNode | React.ReactNode[];
  withLoading?: boolean;
}

export default function Private({ children, withLoading }: PrivateProps) {
  const { status, data } = useSession();
  if (status === "loading") {
    return withLoading ? (
      <Skeleton className="!h-fit !w-fit rounded-full">{children}</Skeleton>
    ) : (
      <></>
    );
  }
  if (status === "unauthenticated") {
    return <></>;
  }
  if (status === "authenticated" && !data?.user) {
    return <></>;
  }
  if (status === "authenticated" && data?.user) {
    return <>{children}</>;
  }
}
