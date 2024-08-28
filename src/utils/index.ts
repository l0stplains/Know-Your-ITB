import { redirect } from "next/navigation";
import themeQuestions from "@/libs/Questions";

export function CheckProvider({ params }: { params: { theme: string } }) {
  if (!themeQuestions.hasOwnProperty(params.theme)) {
    redirect("/404");
  }
}
export function dataTheme(theme: string) {
  switch (theme) {
    case "hmif":
      return {
        Bg200: "bg-green-200",
        Bg100: "bg-green-100",
        Bg25: "bg-green-25",
        Text100: "text-green-100",
        Text25: "text-green-25",
        Checked100: "checked:bg-green-100",
        Border100: "border-green-100",
        typeofTest: "divisions",
        inText: "HMIF",
      };
    case "ukm":
      return {
        Bg200: "bg-blue-200",
        Bg100: "bg-blue-100",
        Bg25: "bg-blue-25",
        Text100: "text-blue-100",
        Text25: "text-blue-25",
        Checked100: "checked:bg-blue-100",
        Border100: "border-blue-100",
        typeofTest: "unit",
        inText: "UKM",
      };
    default:
      return {
        Bg200: "bg-blue-200",
        Bg100: "bg-blue-100",
        Bg25: "bg-blue-25",
        Text100: "text-blue-100",
        Text25: "text-blue-25",
        Checked100: "checked:bg-blue-100",
        Border100: "border-blue-100",
        typeofTest: "unit",
        inText: "UKM",
      };
  }
}
