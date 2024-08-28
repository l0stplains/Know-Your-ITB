'use client'

import React from "react";
import { QuestionType } from "@/types/db";
import {useState, useEffect}  from "react";

export default function TestMultiple({ theme, question}: { theme: string, question: QuestionType }) {
  const  [saveData, setSaveData] = useState("");
  // get the saved data for this question from storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(question.id);
      if (savedData) {
        setSaveData(savedData);
      }
    } else {
      alert("Failed to get saved data");
    }
  }, []);

  const handleChange = (e: { target: { name: any; value: any; id: string }; }) => {
    // save to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem(question.id, e.target.id);
      setSaveData(e.target.id);
    } else {
      alert("Failed to save data");
    }
    
  };



  const colorClass = dataTheme(theme);
  // const {choice, setChoice} = useState(0);
  // const handleChange = (data) => {
  //   setChoice(data);
  // };
  return (
    <div className="mt-12">
      <form action="">
        {question.options && question.options.map((option) => (
        <div
          className={`${colorClass.Text100} flex mx-96 content-center text-xl font-semibold my-4`}
          key={option.id}
        >
          <label className="flex justify-center items-center">
            <input
              id={option.id}
              value={1}
              name="multiple"
              type="radio"
              onChange={handleChange}
              className={`mr-4 appearance-none bg-green w-7 h-7 border-3 rounded-sm ${colorClass.Border100} ${colorClass.Checked100}`}
              checked={saveData == option.id}
            />
            {option.description}
          </label>
        </div>
        ) )
        }
        
      </form>
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


