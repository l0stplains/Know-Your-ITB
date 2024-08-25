import React from 'react'
import ResultDetail from '@/components/ResultDetail'
import { CheckProvider } from '@/utils'

export default function ResultDetailProvider({params}: {params: {theme: string}}) {

  CheckProvider({params})

  return (
    <div>
      <ResultDetail theme={params.theme} />
    </div>
  )
}

