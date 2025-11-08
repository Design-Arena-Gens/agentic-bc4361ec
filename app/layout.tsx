import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoutinePilot",
  description: "An AI co-pilot to craft and refine your daily routines."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
