import { redirect } from "next/navigation";
import themeQuestions from "@/libs/Questions";

export function CheckProvider({ params }: { params: { theme: string } }) {
  if (!themeQuestions.hasOwnProperty(params.theme)) {
    redirect("/404");
  }
}
