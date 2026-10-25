import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Market Home — Shopping, restos et streaming",
  description: "Les boutiques d'Abidjan, tes restos préférés et Netflix. Une seule adresse.",
};

export const viewport: Viewport = {
  themeColor: "#ECEEF3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
