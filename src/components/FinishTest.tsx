'use client'
import React from 'react'
import { QuestionType } from '@/types/db'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function FinishTest({ theme, questions }: {theme:string, questions: QuestionType[] }) {
  // checks if all the question is answered by checking the precense in the local storage, and if not redirect to "/${theme}/test${question.number}"
  // if all the question is answered, then redirect to "/${theme}/result"
  // the code is below

  async function predictData(payload: Record<string, string | number>) {
    try {
      const response = await axios.post('/api/predict', payload)
      return response.data
    } catch (error) {
      console.error(error)
      return null
    }
  }

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
      // turns all the question and the answer into an object
      const payload = questions.reduce<Record<string, string | number>>(
        (acc, question) => {
          const data = localStorage.getItem(question.id);
          if (data && data.length > 1) {
            if (question.options) {
              const option = question.options.find(option => option.id === data);
              if (option) {
                acc[question.question] = option.description ?? '';
              }
            }
            return acc;
          }
          acc[question.question] = parseInt(localStorage.getItem(question.id) ?? '') ?? 0;
          return acc;
        },
        {}
      );

      // send the object to the backend
      predictData(payload).then((data) => {
        if (data) {
          localStorage.setItem(theme, JSON.stringify(data.results))
          // delete all the question in the local storage
          questions.forEach(question => localStorage.removeItem(question.id))
          router.push(`/${theme}/result`)
      }
    })
      


    }
  }






  return (
    // make a loading screen here in the middle rotating
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl">Loading...</h1>
    </div>

  )
}
