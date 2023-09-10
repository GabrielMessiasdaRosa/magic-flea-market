import Test from "@/components/test";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex  flex-1 items-center justify-center ">
      <Suspense fallback={<div>loading...</div>}>
        <Test />
      </Suspense>
      <div className="" />
    </main>
  );
}
