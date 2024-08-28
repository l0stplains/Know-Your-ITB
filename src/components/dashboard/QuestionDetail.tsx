
'use client'

import React from 'react'
import { QuestionType, Theme } from '@/types/db'
import axios from 'axios';
import Link from 'next/link';
import { OptionType } from '@/types/db';

export default function QuestionDetail({ question, theme }: { question: QuestionType, theme: Theme }) {
    const [newQuestion, setNewQuestion] = React.useState<string>(question.question);
    const [newQuestionNumber, setNewQuestionNumber] = React.useState<number>(question.number);
    const [newQuestionType, setNewQuestionType] = React.useState<string>(question.type);

    const [newOption, setNewOption] = React.useState<string>("");
    const [newOptionValue, setNewOptionValue] = React.useState<number>(0);



    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.target.value);
    };

    const handleNewOption = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newQuestion === "") return;

        try {
            const res = await axios.post(`/api/data/option`, {description: newOption, questionId: question.id, value: newOptionValue});

            if (res.status === 200) {
                console.log(`Option ${newOption} created`);
                // Reload the page
                location.reload();
            } else {
                console.error(`Failed to create option ${newOption}`);
            }
        } catch (error) {
            alert("Failed to create Option\nMaybe the option already exists");
        }
    };

    const handleNewQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newOption === "" || newQuestionNumber <= 0 || newQuestionType == "") return;

        try {
            const res = await axios.put(`/api/data/question`, {id: question.id , question: newQuestion, themeId: theme.id, number: newQuestionNumber, type: newQuestionType });

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

    const handleDeleteOption= async (option: OptionType) => {
        // Make sure if admin wants to delete the option
        if (
            !confirm(
                `WARNING! \nAny data related to this will be deleted\n\nAre you sure to delete option ${option.description}?`
            )
        )
            return;
        try {
            const res = await axios.delete(`/api/data/option`, {
                data: { id: option.id },
            });
            if (res.status === 200) {
                console.log(`Option ${option.description} deleted (id: ${option.id})`);
                // Reload the page
                location.reload();
            } else {
                console.error(`Failed to delete option ${option.description} (id: ${option.id})`);
            }
        } catch (error) {
            alert("Failed to delete option");
        }
    };

    return (
        <div className=" relative flex justify-center max-w-5xl items-center flex-col mx-auto px-4">
            <a
                href={`/dashboard/${theme.name}/question`}
                className="text-xl font-bold self-start absolute left-4 top-8"
            >
                {"< Back"}
            </a>
            <h1 className="text-3xl font-bold self-start mt-24">
                Question Detail
            </h1>

            <h2 className='self-start mt-4'>Edit question detail</h2>
            <form
                className="flex justify-center w-full mx-4 mb-4"
                onSubmit={handleNewQuestion}
            >
                <input
                    type="text"
                    placeholder="Question Name"
                    className="bg-gray-25 p-2 rounded-md w-3/5 shadow-lg"
                    onChange={handleFormChange}
                    defaultValue={question.question}
                    required
                />
                <input
                    type="number"
                    placeholder="Question Number"
                    className="bg-gray-25 p-2 rounded-md w-1/5 shadow-lg"
                    onChange={(e) => setNewQuestionNumber(parseInt(e.target.value))}
                    defaultValue={question.number}
                    required
                    min={1}
                />
                <select
                    className="bg-gray-25 p-2 rounded-md w-1/5 shadow-lg"
                    onChange={(e) => {setNewQuestionType(e.target.value); }}
                    defaultValue={question.type}
                    required
                >
                    <option value="" disabled>Type</option>
                    <option value="MULTIPLE_CHOICE">Multiple choice</option>
                    <option value="SCALE" >Scale</option>
                </select>
                <button
                    className="bg-blue-100 text-white rounded-md px-2 py-1 ml-2"
                    type="submit"
                >
                    Save Question
                </button>
            </form>
<div className="flex flex-col w-full mb-48">
        <h2 className='self-start mt-4'>Options</h2>
        {question.options && question.options.map((option: OptionType) => (
          <div
            key={option.id}
            className="flex justify-between bg-gray-25 p-4 w-full  my-2 rounded-md border-2"
          >
            <h2 className="text-lg  line-clamp-1 text-ellipsis max-w-3/5">{option.description}</h2>
            <div className='w-2/5 flex justify-end'>
              <button
                onClick={() => handleDeleteOption(option)}
                className="bg-red-500 text-white rounded-md px-2 py-1 mx-2"
              >
                Delete
              </button>
                <div className="bg-blue-100 text-white rounded-md px-2 py-1 mx-2 w-20">
                   Value: {option.value}
                </div>
            </div>
          </div>
        ))}
      </div>
      <form
        className="fixed bottom-16 flex justify-center w-full max-w-5xl m-4 px-4 "
        onSubmit={handleNewOption}
      >
        <input
          type="text"
          placeholder="Option Name"
          className="bg-gray-25 p-2 rounded-md w-4/5 shadow-lg"
          onChange={(e) => setNewOption(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Option Value"
          className="bg-gray-25 p-2 rounded-md w-1/5 shadow-lg"
          onChange={(e) => setNewOptionValue(parseInt(e.target.value))}
          required
        />
        <button
          className="bg-blue-100 text-white rounded-md px-2 py-1 ml-2"
          type="submit"
        >
          Add Option
        </button>
      </form>
        </div>
    );
}
