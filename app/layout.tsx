import type { Metadata } from "next";
import { display, serif, mono } from "./fonts";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/nav/Header";
import Footer from "@/components/footer/Footer";
import Cursor from "@/components/ui/Cursor";

export const metadata: Metadata = {
  title: {
    default: "Records Fashion School — Kampala, Uganda",
    template: "%s — Records Fashion School",
  },
  description:
    // TODO: replace with real content
    "Records Fashion School is a fashion school in Kampala, Uganda, shaping the next generation of designers, tailors and creative entrepreneurs.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="bg-paper font-mono text-ink antialiased">
        <SmoothScroll />
        <Cursor />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
