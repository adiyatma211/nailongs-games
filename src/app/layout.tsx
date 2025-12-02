import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taman Nailong: Bunga Kembang Semangat",
  description: "Game interaktif untuk menyenangkan hati pacar yang sedang ngambek",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
