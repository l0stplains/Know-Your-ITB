import React from "react";


import { redirect } from "next/navigation";
import Question from "@/components/dashboard/Question";

import { prisma } from "@/libs/prisma";

export default async function QuestionDashboard({params}: {params: {theme: string}}) {


  const theme = await prisma.theme.findUnique(
    {
      where: {
        name: params.theme
      }
    }
  );

  if (!theme) {
    // redirect to 404
    redirect("/dashboard");
  }

  const questions = await prisma.question.findMany(
    {
      where: {
        themeId: theme.id
      },
      orderBy: {
        number: "asc"
      }
    }
  );

  return <Question questions={questions} theme={theme}/>;
}
