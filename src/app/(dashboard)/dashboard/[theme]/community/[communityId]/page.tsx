import React from "react";


import { redirect } from "next/navigation";
import CommunityDetail from "@/components/dashboard/CommunityDetail";

import { prisma } from "@/libs/prisma";

export default async function CommunityDetailDashboard({params}: {params: {theme: string, communityId: string}}) {


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

  const community = await prisma.community.findUnique(
    {
      where: {
        id: params.communityId
      },
    }
  );

  if (!community) {
    // redirect to 404
    redirect("/dashboard");
  }

  return <CommunityDetail community={community} theme={theme}/>;
}
