import SignInPage from "@/components/auth/SignInPage";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const { userId } = await auth();
  if (userId) redirect("/discover");

  return <SignInPage />;
}
