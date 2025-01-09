import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./component/header";
import Sider from "./component/sider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row justify-start w-full gap-4 p-4 ">
      <Sider />
      <div lang="en" className="w-full">
        <Header />

        {children}
      </div>
    </div>
  );
}
