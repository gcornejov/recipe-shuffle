import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe Shuffle",
  description: "Recipes archive with macros count",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-pattern-bubbles m-auto min-h-screen w-[1280px] shadow-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
