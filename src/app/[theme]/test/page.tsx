import {redirect} from "next/navigation"
import themeQuestions from "@/libs/Questions";

export default function Test({ params }: { params: { theme: string } }) {

  if (!themeQuestions.hasOwnProperty(params.theme)) {
    redirect("/404")
  } else {
    console.log(themeQuestions[params.theme])
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Ini Test Page-nya Know Your {params.theme}</div>
    </main>
  );
}
