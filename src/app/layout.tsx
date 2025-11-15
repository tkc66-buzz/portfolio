import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "nes.css/css/nes.min.css";
import { Noto_Sans_JP, Press_Start_2P } from "next/font/google";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
});

const press = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press",
});

export const metadata: Metadata = {
  title: "Takeshi Watanabe (Buzz) – Portfolio",
  description: "Famicom-inspired NES.css portfolio powered by Next.js + TypeScript.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${noto.variable} ${press.variable} bg-[#111] text-fami-ivory`}>
        {children}
      </body>
    </html>
  );
}
