import React from "react";


import { redirect } from "next/navigation";

import { prisma } from "@/libs/prisma";

import QuestionDetail from "@/components/dashboard/QuestionDetail";

export default async function QuestionDetailDashboard({params}: {params: {theme: string, questionId: string}}) {


  const theme = await prisma.theme.findUnique(
    {
      where: {
        name: params.theme
      }
    }
  );

  const question = await prisma.question.findUnique(
    {
      where: {
        id: params.questionId
      },
      include: {
        options: {
          orderBy: {
            value: "asc"
          }
        }
      }
    }
  );

  if (!theme || !question) {
    // redirect to 404
    redirect("/dashboard");
  }

  return <QuestionDetail question={question} theme={theme}/>;

}
