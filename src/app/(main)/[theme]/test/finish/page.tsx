import React from 'react'
import FinishTest from '@/components/FinishTest'
import { prisma } from '@/libs/prisma'
import { redirect } from 'next/navigation'

export default async function FinishProvider({params}: {params: {theme: string}}) {
  const theme = await prisma.theme.findFirst({
    where: {
      name: params.theme
    }
  })
  if (!theme) {
    // redirect to 404
    redirect("/404")
  }
  const questions = await prisma.question.findMany({
    where: {
      themeId: theme.id
    },
    orderBy: {
      number: "asc"
    },
    include: {
      options: {
        orderBy: {
          value: "asc"
        }
      }
    }
  })
  return (
    <FinishTest theme={params.theme} questions={questions} />
  )
}
