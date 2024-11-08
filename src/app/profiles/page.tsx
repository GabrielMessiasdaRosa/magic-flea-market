import { authOptions } from "@/app/api/(lib)/auth-option";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilesPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex  flex-1 items-center justify-center ">
      <h1 className="text-6xl font-bold">All profiles search page</h1>
    </main>
  );
}
