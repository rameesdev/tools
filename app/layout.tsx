import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LayoutClient from "./LayoutClient";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ToolBox - Every tool you need, right in your browser",
  description: "A fast, privacy-focused client-side multi-tool platform. Compress images, merge PDFs, format JSON, test Regex, calculate EMI, and more 100% locally.",
  openGraph: {
    title: "ToolBox - Online Client-Side Tools",
    description: "Privacy-focused browser utility toolkit. PDF, Image, Developer, Converter, and Calculator tools.",
    type: "website",
    siteName: "ToolBox",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-neutral-100 flex min-h-screen`}
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
