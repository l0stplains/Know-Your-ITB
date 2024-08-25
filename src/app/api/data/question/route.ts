import getCurrentUser from "@/libs/server-session";
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const questions = await prisma.question.findMany({
      orderBy: {
        question: "asc",
      },
    });
    return NextResponse.json({ questions });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when getting the question" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  try {
    const question = await prisma.question.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json({ question });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when creating the question" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  try {
    const question = await prisma.question.update({
      where: {
        id: body.id,
      },
      data: {
        ...body,
      },
    });
    return NextResponse.json({ question });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when updating the question" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  try {
    const question = await prisma.question.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ question });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when deleting the question" },
      { status: 500 }
    );
  }
}
