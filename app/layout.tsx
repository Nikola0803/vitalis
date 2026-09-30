import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Vitalis | Canadian Research Compounds",
  description: "Canadian research compounds with clear batch documentation and third-party testing.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}
