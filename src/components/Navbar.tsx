import React from 'react'

export default function Navbar({theme = "default"}: {theme?: string}) { //  theme bisa hmif atau ukm, kalau ada di homepage dia default, bisa dimanfaatin buat logic milih warna
  const bgColor = () =>{
    switch(theme){
      case 'hmif':
        return 'bg-green-400'
      case 'default':
        return 'bg-blue-400'
    }
  }

  return (    
    <div className={`${bgColor()} text-white h-[10vh] flex shadow-xl`}>
      <div className="flex-1 flex items-center">
        <img src ="/logo_itb.png" alt="Logo ITB" className = "w-[3rem] h-auto items-center m-6"/>
        <h2 className = 'text-[1.2rem] font-semibold'>Know Your ITB</h2>
      </div>

      <div className ='flex-1 flex items-center flex-row-reverse'>
        <a href="/">
          <img src = "/home.png" className= "h-auto w-[2rem] m-6"/>
        </a>
        <h1 className="underline"> Previous result</h1>
      </div>
    </div>
  )
}