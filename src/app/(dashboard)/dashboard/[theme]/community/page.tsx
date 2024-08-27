import React from "react";


import { redirect } from "next/navigation";
import Community from "@/components/dashboard/Community";

import { prisma } from "@/libs/prisma";

export default async function CommunityDashboard({params}: {params: {theme: string}}) {


  const theme = await prisma.theme.findUnique(
    {
      where: {
        name: params.theme
      }
    }
  );

  if (!theme) {
    // redirect to 404
    redirect("/dashboard");
  }

  const communities = await prisma.community.findMany(
    {
      where: {
        themeId: theme.id
      },
      orderBy: {
        name: "asc"
      }
    }
  );

  return <Community communities={communities} theme={theme}/>;
}
