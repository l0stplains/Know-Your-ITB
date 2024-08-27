import React from 'react'

export default function Home() {
  return (
    <div className='h-[90vh] grid grid-cols-2'>
      <a href="/ukm" className='h-full relative bg-gray-100 border-r-3 border-blue-50 flex justify-center items-center flex-col group hover:bg-transparent'>
        <img src="itb.jpeg" alt="plawid" className='w-full h-full object-cover absolute mix-blend-overlay group-hover:opacity-75'/>
        <h1 className='text-blue-100 z-10 font-extrabold text-6xl '>UKM</h1>
        <h2 className='text-center text-blue-400 z-10 font-semibold py-2'>Find your perfect fit unit in ITB!</h2>
      </a>

      <a href="/hmif" className='h-full relative bg-gray-100 border-l-3 border-blue-50 flex justify-center items-center flex-col group hover:bg-transparent'>
        <img src="hmif.jpeg" alt="plawid" className='w-full h-full object-cover absolute mix-blend-overlay group-hover:opacity-80'/>
        <h1 className='text-blue-100 z-10 font-extrabold text-6xl '>HMIF</h1>
        <h2 className='text-center text-blue-400 z-10 font-semibold py-2'>Find your perfect fit division in ITB!</h2>
      </a>
    </div>
  )
}
