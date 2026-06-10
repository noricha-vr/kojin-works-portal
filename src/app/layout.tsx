import type { Metadata, Viewport } from "next";
import { Dela_Gothic_One, IBM_Plex_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

// 見出し用の極太ディスプレイフォント（日本語グリフはunicode-range分割で配信される）
const delaGothic = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dela",
  display: "swap",
  preload: false,
});

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen",
  display: "swap",
  preload: false,
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0e1a",
};

export const metadata: Metadata = {
  title: "Kojin Works - 個人開発プロジェクトまとめ",
  description: "個人開発プロジェクトを一覧で紹介するポータルサイト",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  openGraph: {
    title: "Kojin Works - 個人開発プロジェクトまとめ",
    description: "個人開発プロジェクトを一覧で紹介するポータルサイト",
    url: "https://kojin.works",
    siteName: "Kojin Works",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kojin Works - 個人開発プロジェクトまとめ",
    description: "個人開発プロジェクトを一覧で紹介するポータルサイト",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${delaGothic.variable} ${zenKaku.variable} ${plexMono.variable} font-body antialiased`}
      >
        {/* JS無効環境でもコンテンツが見えるように出現アニメーションを無効化 */}
        <noscript>
          <style>{`.reveal,.rise{opacity:1 !important;transform:none !important;animation:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
