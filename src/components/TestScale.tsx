import React from 'react'

export default function TestScale({theme}: {theme: string}) { // theme bisa bernilai 'ukm' atau 'hmif', bisa dimanfaatin buat logic milih warna
  const nomor_pertanyaan = "1"
  const dataTheme = () => {
    switch(theme){
      case 'hmif':
        return {Color200 :'green-200',
                Color100 :'green-100',
                Color50 :'green-50',
                Color25 :'green-25',
                typeofTest : 'divisions',
                inText : 'HMIF',
        }
      case 'ukm':
        return {color200 :'blue-200',
                Color100 :'blue-100',
                Color50 :'blue-50',
                Color25 :'blue-25',
                typeofTest : 'unit',
                inText : 'ITB',
        }
    }
  }
  // const {choice, setChoice} = useState(0);
  // const handleChange = (data) => {
  //   setChoice(data); 
  // };
  return (
    <div className=''>
      <h1 className={`bg-blue-200 text-blue-25 font-bold text-xl text-center content-center py-5`}>Find your perfect fit {theme} in {theme}!</h1>
      <div className="grid-grid-cols-3">
        <div className="bg-blue-100 content-center text-blue-25 text-center mx-12 my-8 w-64 h-12">
          <h3 className="">Questions</h3>
        </div>
      </div>
      <div className="grid-grid-cols-3">
        <div className="bg-blue-100 text-blue-25 p-2 my-16 mx-96 content-center">
          <h2 className="font-semibold text-center"> [Question {nomor_pertanyaan}]</h2>
        </div>
      </div>
      <div className="flex mx-96 content-center text-blue-100 text-lg font-semibold">
        <label><input type="checkbox"/> Option 1</label>
      </div>
      <div className="flex mx-96 content-center text-blue-100 text-lg font-semibold">
        <label><input type="checkbox"/> Option 2</label>
      </div>
      <div className="flex mx-96 content-center text-blue-100 text-lg font-semibold">
        <label><input type="checkbox"/> Option 3</label>
      </div>
      <div className="flex mx-96 content-center text-blue-100 text-lg font-semibold">
        <label><input type="checkbox"/> Option 4</label>
      </div>
      <div className="flex mx-96 content-center text-blue-100 text-lg font-semibold">
        <label><input type="checkbox"/> Option 5</label>
      </div>
        {/* <label><input type="checkbox" value={choice} onChange={()=>handleChange(1)}/> Option 1</label>
        <label><input type="checkbox" value={choice} onChange={()=>handleChange(2)}/> Option 2</label>
        <label><input type="checkbox" value={choice} onChange={()=>handleChange(3)}/> Option 3</label>
        <label><input type="checkbox" value={choice} onChange={()=>handleChange(4)}/> Option 4</label>
        <label><input type="checkbox" value={choice} onChange={()=>handleChange(5)}/> Option 5</label> */}
    </div>
  )
}