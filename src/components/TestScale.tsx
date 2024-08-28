import React from "react";
import { dataTheme } from "@/utils";

export default function TestScale({ theme }: { theme: string }) {
  // theme bisa bernilai 'ukm' atau 'hmif', bisa dimanfaatin buat logic milih warna
  const nomor_pertanyaan = "1";

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
            colorClass.Bg100 + " " + colorClass.Text25
          } content-center text-center mx-12 mt-8 w-52 h-12 font-semibold relative  group`}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <svg
            className={`absolute left-3 top-1 h-8 w-8 ${colorClass.Text25}`}
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

          <div className="hidden group-focus:flex flex-col mt-2 w-52 absolute max-h-32 overflow-y-auto text-black">
            <div
              className={`px-4 py-1 flex justify-center items-center ${colorClass.Bg25} w-full`}
            >
              <a href="#">Link 1</a>
            </div>

            <div
              className={`px-4 py-1 flex justify-center items-center ${colorClass.Bg25} w-full`}
            >
              <a href="#">Link 1</a>
            </div>
            <div
              className={`px-4 py-1 flex justify-center items-center ${colorClass.Bg25} w-full`}
            >
              <a href="#">Link 1</a>
            </div>
            <div
              className={`px-4 py-1 flex justify-center items-center ${colorClass.Bg25} w-full`}
            >
              <a href="#">Link 1</a>
            </div>
            <div
              className={`px-4 py-1 flex justify-center items-center ${colorClass.Bg25} w-full`}
            >
              <a href="#">Link 1</a>
            </div>
            <div
              className={`px-4 py-1 flex justify-center items-center ${colorClass.Bg25} w-full`}
            >
              <a href="#">Link 1</a>
            </div>
          </div>
        </button>
      </div>
      <div className="grid-grid-cols-3">
        <div
          className={`${
            colorClass.Bg100 + " " + colorClass.Text25
          } p-2 mt-16 mb-10 mx-96 content-center`}
        >
          <h2 className="font-semibold text-center text-xl">
            {" "}
            [Question {nomor_pertanyaan}]
          </h2>
        </div>
      </div>
      <form action="">
        <div
          className={`${colorClass.Text100} flex mx-96 content-center text-lg font-semibold my-3`}
        >
          <label className="flex justify-center items-center">
            <input
              id="1"
              value={1}
              name="1"
              type="radio"
              className={`mr-4 appearance-none bg-green w-6 h-6 border-3 rounded-sm ${colorClass.Border100} ${colorClass.Checked100} c`}
            />{" "}
            Option 1
          </label>
        </div>
        <div
          className={`${colorClass.Text100} flex mx-96 content-center text-lg font-semibold my-3`}
        >
          <label className="flex justify-center items-center">
            <input
              id="1"
              value={1}
              name="1"
              type="radio"
              className={`mr-4 appearance-none bg-green w-6 h-6 border-3 rounded-sm ${colorClass.Border100} ${colorClass.Checked100} c`}
            />{" "}
            Option 1
          </label>
        </div>
      </form>
      {/* <label><input type="checkbox" value={choice} onChange={()=>handleChange(1)}/> Option 1</label>
        <label><input type="checkbox" value={choice} onChange={()=>handleChange(2)}/> Option 2</label>
        <label><input type="checkbox" value={choice} onChange={()=>handleChange(3)}/> Option 3</label>
        <label><input type="checkbox" value={choice} onChange={()=>handleChange(4)}/> Option 4</label>
        <label><input type="checkbox" value={choice} onChange={()=>handleChange(5)}/> Option 5</label> */}
    </div>
  );
}
