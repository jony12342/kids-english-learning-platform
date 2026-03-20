import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kids English Learning - 幼儿英语学习平台",
  description: "通过AI互动，让3-6岁幼儿快乐学英语",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
