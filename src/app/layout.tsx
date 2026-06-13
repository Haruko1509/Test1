import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VibeReel – Short Video Feed",
  description:
    "Khám phá video ngắn thú vị, theo dõi creator yêu thích và chia sẻ khoảnh khắc đặc biệt của bạn trên VibeReel.",
  keywords: ["video", "short video", "reels", "tiktok clone", "vertical feed"],
  openGraph: {
    title: "VibeReel – Short Video Feed",
    description: "Vertical short video feed built with Next.js & TypeScript",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.variable}>
        <div className="app-shell">
          <Navigation />
          <main className="main-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
