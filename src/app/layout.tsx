import "nes.css/css/nes.min.css";
import type { Metadata } from "next";
import { DotGothic16, Noto_Sans_JP, Press_Start_2P } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const noto = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto" });
const press = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press",
});
const dotGothic = DotGothic16({ weight: "400", subsets: ["latin"], variable: "--font-dotgothic" });

export const metadata: Metadata = {
  title: "Takeshi Watanabe (Buzz) – Portfolio",
  description: "Famicom-inspired NES.css portfolio powered by Next.js + TypeScript.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${noto.variable} ${press.variable} ${dotGothic.variable} text-white`}>
        {children}
      </body>
    </html>
  );
}
