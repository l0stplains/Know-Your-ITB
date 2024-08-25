import React from 'react'

import { getServerSession } from 'next-auth'
import {redirect} from 'next/navigation'

export default async function Dashboard() {
  const session = await getServerSession()
  if(!session) {
    // redirect to sign-in page
    redirect('/dashboard/sign-in')
  }


  return (
    <div>Dashboard</div>
  )
}
