import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/dashboard/Navbar";
import { getServerSession } from "next-auth";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Know Your ITB",
  description: "Get to know ITB that suits you",
};

const session = getServerSession();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar session={session}/>
        {children}
      </body>
    </html>
  );
}
