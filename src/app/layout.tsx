import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
