import {getServerSession} from 'next-auth'
import {authOptions} from '@/libs/auth'

export default async function getCurrentUser(){
  const session = await getServerSession(authOptions)
  return session?.user
}