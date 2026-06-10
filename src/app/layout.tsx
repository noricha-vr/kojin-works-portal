import type { Metadata, Viewport } from "next";
// next/font/google はビルド時にGoogle Fontsへ大量フェッチが走り、CIで失敗しやすいため
// @fontsource による自己ホスト（バージョン固定・ビルド時ネットワーク依存なし）を採用
import "@fontsource/dela-gothic-one/400.css";
import "@fontsource/zen-kaku-gothic-new/400.css";
import "@fontsource/zen-kaku-gothic-new/500.css";
import "@fontsource/zen-kaku-gothic-new/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";

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
      <body className="font-body antialiased">
        {/* JS無効環境でもコンテンツが見えるように出現アニメーションを無効化 */}
        <noscript>
          <style>{`.reveal,.rise{opacity:1 !important;transform:none !important;animation:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
