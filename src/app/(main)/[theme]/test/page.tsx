import React from 'react'
import {redirect} from 'next/navigation'

export default function Test() {

  redirect('/ukm/test/scale')

  return (
    <div>Test</div>

  )
}
