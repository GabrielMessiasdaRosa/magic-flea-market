import { authOptions } from "@/app/api/(lib)/auth-option";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getProfile = async (id: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profiles/${id}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return null;
    })
    .catch((error) => {
      return error;
    });
};

export default async function UserProfilePage({
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
  const profile = await getProfile(params.id);
  if (!profile) {
    return (
      <main className="flex  flex-1 items-center justify-center ">
        <h1 className="text-6xl font-bold">profile not found</h1>
      </main>
    );
  }
  if (session.user.profile.id === params.id) {
    return redirect(`/profiles/me/${session.user.profile.id}`);
  }
  return (
    <main className="flex  flex-1 items-center justify-center ">
      <h1 className="text-6xl font-bold">User page</h1>
    </main>
  );
}
