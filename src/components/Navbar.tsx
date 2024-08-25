import React from 'react'

export default function Navbar({theme = "default"}: {theme?: string}) { //  theme bisa hmif atau ukm, kalau ada di homepage dia default, bisa dimanfaatin buat logic milih warna
  return (
    <div className='bg-blue-400 text-white h-16 flex'>
      <div className="flex-1 flex items-center">
        <img src ="logo_itb.png" alt="Logo ITB" className = "w-[3rem] h-auto items-center m-6"/>
        <h2 className = 'text-[1.2rem]'>Know Your ITB</h2>
      </div>

      <div className ='flex-1 flex items-center flex-row-reverse'>
        <a href="/">
          <img src = "home.png" className= "h-auto w-[2rem] m-6"/>
        </a>
        <h1 className="underline"> Previous result</h1>
      </div>
    </div>
  )
}