import React from 'react'
import WhatsIn from '@/components/WhatsIn'
import { CheckProvider } from '@/utils'

export default function WhatsInProvider({params}: {params: {theme: string}}) {

  CheckProvider({params})

  return (
    <div>
      <WhatsIn theme={params.theme as 'ukm' | 'hmif'} />
    </div>

  )
}
