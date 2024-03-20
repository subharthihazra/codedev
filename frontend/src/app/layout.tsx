import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <div className=" text-slate-700 text-sm text-center my-2">
          Made by Subharthi Hazra |{" "}
          <a
            href="https://github.com/subharthihazra/codedev"
            target="_blank"
            className=" underline"
          >
            Github Repo
          </a>
        </div>
      </body>
    </html>
  );
}
