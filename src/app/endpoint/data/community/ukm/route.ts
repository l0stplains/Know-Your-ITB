import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(req: Request) {
  try {
    const communities = await prisma.community.findMany({
      orderBy: {
        name: "asc",
      },
      where: {
        themeId: "cm09ep70x0001civrvj8rt5kp",
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