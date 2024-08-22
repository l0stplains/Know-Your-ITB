import { CheckProvider } from '@/utils'
import WhatsInDetail from '@/components/WhatsInDetail'
import React from 'react'

export default function WhatsInDetailProvider({params}: {params: {theme: string}}) {

  CheckProvider({params})

  return (
    <div>
      <WhatsInDetail theme={params.theme} />
    </div>
  )
}
