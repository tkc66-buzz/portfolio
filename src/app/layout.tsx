import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";
import { REVEAL_READY_CLASS } from "@/components/reveal";

const noto = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto" });
// Bold Japanese pixel font (subset, see scripts/subset-pixel-font.py): Press Start
// 2P has no Japanese glyphs, so they fall back to this instead of a smooth gothic.
const pixelJp = localFont({
  src: "./fonts/PixelMplus12-Bold.subset.woff2",
  variable: "--font-pixel-jp",
  display: "swap",
});
// Press Start 2P is bundled unmodified (OFL, see ./fonts/PressStart2P-OFL.txt) so
// it can be drawn at 90%: at full size its wide capitals looked bigger than the
// Japanese pixel glyphs next to them.
const press = localFont({
  src: "./fonts/PressStart2P-Regular.ttf",
  variable: "--font-press",
  display: "swap",
  declarations: [{ prop: "size-adjust", value: "90%" }],
});

export const metadata: Metadata = {
  title: "Takeshi Watanabe (Buzz) – Portfolio",
  description: "Retro-modern portfolio of Takeshi Watanabe (Buzz), built with Next.js + three.js.",
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
  // Opts into scroll-reveal (hidden-until-visible) only when JS runs and the
  // user has not asked for reduced motion, so content never stays hidden.
  const revealScript = `
(function(){
  try {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
      document.documentElement.classList.add(${JSON.stringify(REVEAL_READY_CLASS)});
    }
  } catch (e) {}
})();
`;

  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body className={`${noto.variable} ${press.variable} ${pixelJp.variable} text-fami-ivory`}>
        {children}
      </body>
    </html>
  );
}
