import "nes.css/css/nes.min.css";
import type { Metadata } from "next";
import { Noto_Sans_JP, Press_Start_2P } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import "./globals.css";
import {
  START_GATE_CLASS_NOT_STARTED,
  START_GATE_CLASS_STARTED,
  START_GATE_STORAGE_KEY,
} from "@/components/startGate";

const noto = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto" });
const press = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press",
});

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
    <html lang="ja" suppressHydrationWarning>
      <body className={`${noto.variable} ${press.variable} text-white`}>
        <Script id="start-gate-init" strategy="beforeInteractive">{`
(function () {
  try {
    var key = ${JSON.stringify(START_GATE_STORAGE_KEY)};
    var started = sessionStorage.getItem(key) === "1";
    var root = document.documentElement;
    if (started) root.classList.add(${JSON.stringify(START_GATE_CLASS_STARTED)});
    else root.classList.add(${JSON.stringify(START_GATE_CLASS_NOT_STARTED)});
  } catch (e) {
    document.documentElement.classList.add(${JSON.stringify(START_GATE_CLASS_NOT_STARTED)});
  }
})();
        `}</Script>
        {children}
      </body>
    </html>
  );
}
