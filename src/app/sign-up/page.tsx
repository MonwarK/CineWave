import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import SignUpPage from "@/components/auth/SignUpPage";

export default async function page() {
  const { userId } = await auth();
  if (userId) redirect("/discover");

  return <SignUpPage />;
}
