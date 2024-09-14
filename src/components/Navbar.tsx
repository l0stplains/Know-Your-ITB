'use client'

import { useParams } from 'next/navigation'
import React from 'react'

export default function Navbar() {
  const params = useParams()
  const theme = params.theme || 'ukm'
  const bgColor = () =>{
    switch(theme){
      case 'hmif':
        return 'bg-green-400'
      case 'ukm':
        return 'bg-blue-400'
      default:
        return 'bg-blue-400'
    }
  }


  return (    
    <div className={`${bgColor()} text-white h-[72px] flex shadow-xl`}>
      <div className="flex-1 flex items-center">
        <img src ="/logo_itb.png" alt="Logo ITB" className = "w-[3rem] h-auto items-center m-6 max-md:m-3"/>
        <h2 className = 'text-[1.2rem] max-md:text-[0.8rem] font-semibold'>Know Your ITB</h2>
      </div>

      <div className ='flex-1 flex items-center  flex-row-reverse'>
        <a href="/">
          <img src = "/home.png" className= "h-auto w-[2rem] m-6 max-md:m-3"/>
        </a>
        <a href={`/${theme}/result`} className="underline max-md:text-sm"> Previous result</a>
      </div>
    </div>
  )
}