import React from "react";

import Home from "@/components/dashboard/Home";

import { prisma } from "@/libs/prisma";

export default async function Dashboard() {

  const themes = await prisma.theme.findMany();

  return <Home themes={themes} />;
}
