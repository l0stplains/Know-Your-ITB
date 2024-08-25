import getCurrentUser from "@/libs/server-session";
import { NextResponse } from "next/server";
import {prisma} from "@/libs/prisma";

export async function GET(req: Request){
  const user = await getCurrentUser()
  if(!user?.email){
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const themes = await prisma.theme.findMany({
    orderBy : {
      name : 'asc'
    },
  })

  return NextResponse.json({themes})

}

export async function POST(req: Request){
  const user = await getCurrentUser()
  if(!user?.email){
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const body = await req.json()
  const theme = await prisma.theme.create({
    data: {
      ...body
    }
  })

  return NextResponse.json({theme})
}

export async function PUT(req: Request){
  const user = await getCurrentUser()
  if(!user?.email){
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const body = await req.json()
  const theme = await prisma.theme.update({
    where: {
      id: body.id
    },
    data: {
      ...body
    }
  })

  return NextResponse.json({theme})
}

export async function DELETE(req: Request){
  const user = await getCurrentUser()
  if(!user?.email){
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const {id} = await req.json()
  const theme = await prisma.theme.delete({
    where: {
      id
    }
  })

  return NextResponse.json({theme})
}