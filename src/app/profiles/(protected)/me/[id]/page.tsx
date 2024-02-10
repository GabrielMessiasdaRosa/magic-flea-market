import { authOptions } from "@/app/api/(lib)/auth-option";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function MyProfilePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return redirect(`/login?callbackUrl=/profiles/${params.id}`);
  }
  if (session.user.profile.id !== params.id) {
    return redirect(`/profiles/me/${session.user.profile.id}`);
  }
  return (
    <main className="flex  flex-1 items-center justify-center ">
      <h1 className="text-6xl font-bold">My profile page</h1>
    </main>
  );
}
