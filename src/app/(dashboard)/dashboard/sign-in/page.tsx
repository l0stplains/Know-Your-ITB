import { getServerSession } from "next-auth";
import SignIn from "@/components/SignIn";
import { redirect } from "next/navigation";

export default async function SignInProvider() {
  const session = await getServerSession();
  if(session) {
    // redirect to dashboard
    redirect("/dashboard");
  }

  return (
    <SignIn />
  )
 
};
