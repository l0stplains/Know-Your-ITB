'use client'
import React from 'react'
import { QuestionType } from '@/types/db'
import { useRouter } from 'next/navigation'

export default function FinishTest({ theme, questions }: {theme:string, questions: QuestionType[] }) {
  // checks if all the question is answered by checking the precense in the local storage, and if not redirect to "/${theme}/test${question.number}"
  // if all the question is answered, then redirect to "/${theme}/result"
  // the code is below

  const router = useRouter()
  if (typeof window === "undefined") {
    return <div>Cant get the result because browser is not supported</div>
  }
  const isAllAnswered = questions.every(question => localStorage.getItem(question.id))
  if (!isAllAnswered) {
    if (typeof window !== "undefined") {
      for (let i = 0; i < questions.length; i++) {
        if (!localStorage.getItem(questions[i].id)) {
          router.push(`/${theme}/test/${questions[i].number}`)
          break
        }
      }
    }
  } else {
    if (typeof window !== "undefined") {
      // use useRouter to redirect instead of window
      router.push(`/${theme}/result`)
    }
  }






  return (
    // make a loading screen here in the middle rotating
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl">Loading...</h1>
    </div>

  )
}
