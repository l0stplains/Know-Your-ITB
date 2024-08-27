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

  return NextResponse.json({themes}, {status: 200})

}

export async function POST(req: Request){
  const user = await getCurrentUser()
  if(!user?.email){
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const {name} = await req.json()

  const existingTheme = await prisma.theme.findFirst({
    where: {
      name
    }
  })


  if(existingTheme){
    return NextResponse.json({error: 'Theme already exists'}, {status: 400})
  }

  const theme = await prisma.theme.create({
    data: {
      name
    }
  })

  return NextResponse.json({theme}, {status: 200})
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

  return NextResponse.json({theme}, {status: 200})
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

  return NextResponse.json({theme}, {status: 200})
}