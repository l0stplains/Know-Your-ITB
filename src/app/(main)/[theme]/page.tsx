import React from 'react'
import { CheckProvider } from '@/utils'
import WhatsInHmif from '@/components/WhatsInHmif'
import WhatsInUkm from '@/components/WhatsInUkm'

export default function WhatsInProvider({params}: {params: {theme: string}}) {

  CheckProvider({params})

  if (params.theme === 'hmif') {
  return (
    <div>
      <WhatsInHmif theme={params.theme} />
    </div>

  )} else if (params.theme === 'ukm') {
  return (
    <div>
      <WhatsInUkm theme={params.theme} />
    </div>

  )} else {
    return <div>Page not found</div>;
  }
}
