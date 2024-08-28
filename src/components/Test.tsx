
import React from "react";
import { QuestionType } from "@/types/db";
import TestMultiple from "@/components/TestMultiple";
import TestScale from "@/components/TestScale";
import Link from "next/link";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export default function Test({ theme, questions, question }: { theme: string, questions: QuestionType[], question: QuestionType }) {
  // theme bisa bernilai 'ukm' atau 'hmif', bisa dimanfaatin buat logic milih warna

  const colorClass = dataTheme(theme);
  // const {choice, setChoice} = useState(0);
  // const handleChange = (data) => {
  //   setChoice(data);
  // };
  return (
    <div className="">
      <h1
        className={`${
          colorClass.Bg200 + " " + colorClass.Text25
        } font-bold text-3xl text-center content-center py-5`}
      >
        Find your perfect fit {colorClass.typeofTest} in ITB!
      </h1>
      <div className="group">
        <button
          className={`${
            colorClass.Bg50 + " " + colorClass.Text25
          } content-center text-center mx-12 mt-8 w-52 h-12 font-semibold relative  group`}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <svg
            className={`absolute left-3 top-2 h-8 w-8 ${colorClass.Text25} group-focus-within:rotate-180`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="">Questions</h3>

          <div className="hidden group-focus-within:flex flex-col mt-3 w-52 absolute max-h-32 overflow-y-auto text-black" style={{ direction: "rtl" }}>
            {questions.map((q: QuestionType) => (
              <Link
                href={`/${theme}/test/${q.number}`}
                key={q.id}
                className={`px-4 py-1 flex justify-center items-center ${question.number == q.number  ? colorClass.Bg50: colorClass.Bg25} w-full`}
              >
                <div>Question {q.number}</div>
              </Link>
            ))}

            
          </div>
        </button>
      </div>
      <div className="grid-grid-cols-3">
        <div
          className={`${
            colorClass.Bg50 + " " + colorClass.Text25
          } p-2 mt-16 mb-4 mx-96 content-center`}
        >
          <h2 className="font-semibold text-center text-xl">
            {question.number}. {question.question}
          </h2>
        </div>
      </div>

      {question.type === "MULTIPLE_CHOICE" ? <TestMultiple theme={theme} question={question}/> : <TestScale theme={theme} question={question}/>}
        
        {question.number != 1 && (
        <div className={`fixed bottom-20 left-32`}>
          <Link href={`/${theme}/test/${question.number - 1}`} className="text-xl font-semibold">
          <SlArrowLeft className="inline-block h-10 w-10 "/>
            {" Previous question"}
          </Link>
        </div>
        )}
        {question.number != questions.length && (
        <div className={`fixed bottom-20 right-32`}>
          <Link href={`/${theme}/test/${question.number + 1}`} className="text-xl font-semibold">
            {"Next question "}
            <SlArrowRight className="inline-block h-10 w-10 transform"/>
          </Link>
          </div>
        )}
        {question.number === questions.length && (
        <div className={`fixed bottom-20 right-32`}>
          <Link href={`/${theme}/test/finish`} className="text-xl font-semibold">
              {"Finish test"}
            <SlArrowRight className="inline-block h-10 w-10 transform"/>
          </Link>
          </div>
        )}
    </div>
  );
}


function dataTheme(theme: string) {
  switch (theme) {
    case "hmif":
      return {
        Bg200: "bg-green-200",
        Bg100: "bg-green-100",
        Bg50: "bg-green-50",
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
        Bg50: "bg-blue-50",
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
        Bg50: "bg-blue-50",
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


