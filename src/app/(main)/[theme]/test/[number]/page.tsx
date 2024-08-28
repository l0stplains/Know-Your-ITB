import React from 'react'
import {prisma} from '@/libs/prisma'
import { redirect } from 'next/navigation';
import Test from '@/components/Test'

export default async function TestNumber({params}: {params: {theme: string, number: string}}) {
  const theme = await prisma.theme.findFirst(
    {
      where: {
        name: params.theme
      }
    }
  );

  if (!theme) {
    // redirect to 404
    redirect("/404");
  }

  const questions = await prisma.question.findMany(
    {
      orderBy: {
        number: "asc"
      },
      where: {
        themeId: theme.id
      }
    }
  );

  const question = await prisma.question.findFirst(
    {
      where: {
        number: parseInt(params.number),
        themeId: theme.id
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

  if (!question) {
    // redirect to 404
    redirect("/404");
  }

  return (
    <Test theme={params.theme} questions={questions} question={question} />
  )
}
