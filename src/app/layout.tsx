import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google"; // Keep Inter for body text as it's readable
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Configure local F1 font
const f1Font = localFont({
  src: [
    {
      path: "../../public/fonts/Formula1-Regular-1.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Formula1-Bold-4.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Formula1-Wide.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ryusaaa | F1 Inspired Portfolio",
  description: "High-performance frontend engineering. Built with Next.js and Tailwind.",
  // Icon is handled automatically by src/app/icon.png
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${f1Font.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
