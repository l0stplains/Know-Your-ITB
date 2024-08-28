import getCurrentUser from "@/libs/server-session";
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const communities = await prisma.community.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ communities });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when getting the communities" },
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
    const community = await prisma.community.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json({ community });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when creating the community" },
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
    const community = await prisma.community.update({
      where: {
        id: body.id,
      },
      data: {
        ...body,
      },
    });
    return NextResponse.json({ community });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when updating the community" },
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
    const community = await prisma.community.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ community });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when deleting the community" },
      { status: 500 }
    );
  }
}
