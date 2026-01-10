import "nes.css/css/nes.min.css";
import type { Metadata } from "next";
import { Noto_Sans_JP, Press_Start_2P } from "next/font/google";
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
  // Inline script to run synchronously before first paint.
  // Sets `is-started` if sessionStorage flag is set, otherwise keeps `not-started`.
  const startGateScript = `
(function(){
  try {
    if (sessionStorage.getItem(${JSON.stringify(START_GATE_STORAGE_KEY)}) === "1") {
      document.documentElement.classList.remove(${JSON.stringify(START_GATE_CLASS_NOT_STARTED)});
      document.documentElement.classList.add(${JSON.stringify(START_GATE_CLASS_STARTED)});
    }
  } catch (e) {}
})();
`;

  return (
    <html lang="ja" className={START_GATE_CLASS_NOT_STARTED} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: startGateScript }} />
      </head>
      <body className={`${noto.variable} ${press.variable} text-white`}>
        {children}
      </body>
    </html>
  );
}
