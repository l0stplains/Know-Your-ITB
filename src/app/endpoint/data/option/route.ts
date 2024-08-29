import getCurrentUser from "@/libs/server-session";
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { questionId } = await req.json();

    const options = await prisma.option.findMany({
      where: {
        questionId,
      },
    });

    return NextResponse.json({ options });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when getting the options" },
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
    const option = await prisma.option.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json({ option });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when creating the option" },
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
    const option = await prisma.option.update({
      where: {
        id: body.id,
      },
      data: {
        ...body,
      },
    });
    return NextResponse.json({ option });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when updating the option" },
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
    const option = await prisma.option.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ option });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when deleting the option" },
      { status: 500 }
    );
  }
}