'use client'

import React from "react";
import { QuestionType } from "@/types/db";
import { useState, useEffect } from "react";

export default function TestScale({ theme, question}: { theme: string, question: QuestionType }) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // save to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem(question.id, e.target.value);
      setSaveData(e.target.value);
    } else {
      alert("Failed to save data");
    }
  };

  const colorClass = dataTheme(theme);

  return (
    <div className="">
      <form action="" className="flex flex-row justify-center mx-96">
        <div
          className={`${colorClass.Text100} flex content-center text-sm`}
        >
          <label className="flex justify-center items-center flex-col">
            <input
              id={(question.options && question.options[0].id) || '1'}
              value={1}
              name="scale"
              type="radio"
              onChange={handleChange}
              className={`appearance-none mb-3 mt-4 mx-8 bg-green w-24 h-24 border-3 rounded-full ${colorClass.Border100} ${colorClass.Checked100}`}
              checked={saveData === "1"}
            />
            {(question.options && question.options[0].description) || "Sangat tidak"}
          </label>
        </div>
        <div
          className={`${colorClass.Text100} flex content-center text-sm`}
        >
          <label className="flex justify-center items-center flex-col">
            <input
              id="2"
              value={2}
              name="scale"
              type="radio"
              onChange={handleChange}
              className={`appearance-none mb-3 mx-8 bg-green w-16 h-16 border-3 rounded-full ${colorClass.Border100} ${colorClass.Checked100}`}
              checked={saveData === "2"}
            />
          </label>
        </div>
        <div
          className={`${colorClass.Text100} flex content-center text-sm`}
        >
          <label className="flex justify-center items-center flex-col">
            <input
              id="3"
              value={3}
              name="scale"
              type="radio"
              onChange={handleChange}
              className={`appearance-none mb-3 mx-8 bg-green w-12 h-12 border-3 rounded-full ${colorClass.Border100} ${colorClass.Checked100}`}
              checked={saveData === "3"}
            />
          </label>
        </div>
        <div
          className={`${colorClass.Text100} flex content-center text-sm`}
        >
          <label className="flex justify-center items-center flex-col">
            <input
              id="4"
              value={4}
              name="scale"
              type="radio"
              onChange={handleChange}
              className={`appearance-none mb-3 mx-8 bg-green w-16 h-16 border-3 rounded-full ${colorClass.Border100} ${colorClass.Checked100}`}
              checked={saveData === "4"}
            />
          </label>
        </div>

        <div
          className={`${colorClass.Text100} flex content-center text-sm`}
        >
          <label className="flex justify-center items-center flex-col">
            <input
              id={(question.options && question.options[question.options.length - 1].id) || '5'}
              value={5}
              name="scale"
              type="radio"
              onChange={handleChange}
              className={`appearance-none mb-3 mt-4 mx-8 bg-green w-24 h-24 border-3 rounded-full ${colorClass.Border100} ${colorClass.Checked100}`}
              checked={saveData === "5"}
            />
            {(question.options && question.options[question.options.length - 1].description) || "Sangat iya"}
          </label>
        </div>
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


