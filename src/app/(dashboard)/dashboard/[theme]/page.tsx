import React from "react";

import Theme from "@/components/dashboard/Theme";

export default async function ThemePage({params}: {params: {theme: string}}) {
  
  return (
    <Theme theme={params.theme} />

  )
}
