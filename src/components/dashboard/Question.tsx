'use client'

import React from 'react'
import {QuestionType, Theme} from '@/types/db'
import axios from 'axios';
import Link from 'next/link';

export default function Question({questions, theme}: {questions: QuestionType[], theme: Theme}) {
  const [newQuestion, setNewQuestion] = React.useState<string>("");
  const [newQuestionNumber, setNewQuestionNumber] = React.useState<number>(0);
  const [newQuetsionType, setNewQuestionType] = React.useState<string>("");


  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion(e.target.value);
  };

  const handleNewQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newQuestion === "") return;

    try {
      const res = await axios.post(`/api/data/question`, { question: newQuestion, themeId: theme.id, number: newQuestionNumber, type: newQuetsionType });

      if (res.status === 200) {
        console.log(`Question ${newQuestion} created`);
        // Reload the page
        location.reload();
      } else {
        console.error(`Failed to create question ${newQuestion}`);
      }
    } catch (error) {
      alert("Failed to create Question\nMaybe the question already exists");
    }
  };

  const handleDeleteQuestion = async (question:QuestionType) => {
    // Make sure if admin wants to delete the question
    if (
      !confirm(
        `WARNING! \nAny data related to this will be deleted\n\nAre you sure to delete question ${question.question}?`
      )
    )
      return;
    try {
      const res = await axios.delete(`/api/data/question`, {
        data: { id: question.id },
      });
      if (res.status === 200) {
        console.log(`Question ${question.question} deleted (id: ${question.id})`);
        // Reload the page
        location.reload();
      } else {
        console.error(`Failed to delete question ${question.question} (id: ${question.id})`);
      }
    } catch (error) {
      alert("Failed to delete question");
    }
  };

  return (
    <div className=" relative flex justify-center max-w-5xl items-center flex-col mx-auto px-4">
      <a
        href={`/dashboard/${theme.name}`}
        className="text-xl font-bold self-start absolute left-4 top-8"
      >
        {"< Back"}
      </a>
      <h1 className="text-3xl font-bold self-start mt-24">
        {theme.name.toUpperCase() + " Questions"}
      </h1>
      <div className="flex flex-col w-full mb-48">
        {questions.map((question: QuestionType) => (
          <div
            key={question.id}
            className="flex justify-between bg-gray-25 p-4 w-full  my-2 rounded-md border-2"
          >
            <h2 className="text-lg  line-clamp-1 text-ellipsis max-w-3/5">{question.number}. {question.question}</h2>
            <div className='w-2/5 flex justify-end'>
              <button
                onClick={() => handleDeleteQuestion(question)}
                className="bg-red-500 text-white rounded-md px-2 py-1 mx-2"
              >
                Delete
              </button>
              <Link href={`/dashboard/${theme.name}/question/${question.id}`}>
                <button className="bg-blue-100 text-white rounded-md px-2 py-1 mx-2">
                  Detail
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <form
        className="fixed bottom-16 flex justify-center w-full max-w-5xl m-4 px-4 "
        onSubmit={handleNewQuestion}
      >
        <input
          type="text"
          placeholder="Question Name"
          className="bg-gray-25 p-2 rounded-md w-3/5 shadow-lg"
          onChange={handleFormChange}
          required
        />
        <input
          type="number"
          placeholder="Question Number"
          className="bg-gray-25 p-2 rounded-md w-1/5 shadow-lg"
          onChange={(e) => setNewQuestionNumber(parseInt(e.target.value))}
          required
          min={1}
        />
        <select
          className="bg-gray-25 p-2 rounded-md w-1/5 shadow-lg"
          onChange={(e) => setNewQuestionType(e.target.value)}
          
          required
        > 
        <option value="" disabled selected>Type</option>
        <option value="MULTIPLE_CHOICE" >Multiple choice</option>
        <option value="SCALE">Scale</option>
        </select>
        <button
          className="bg-blue-100 text-white rounded-md px-2 py-1 ml-2"
          type="submit"
        >
          Add Question
        </button>
      </form>
    </div>
  );
}
