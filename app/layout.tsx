import "./globals.css";
import type { Metadata } from "next";
import { Nunito, Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading"
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Eva Home Cleaning | San Francisco + Peninsula",
  description:
    "Friendly, trustworthy residential cleaning for San Francisco and the Peninsula. Regular, deep, and move-out cleanings tailored to your home.",
  metadataBase: new URL("https://evahomecleaning.com"),
  openGraph: {
    title: "Eva Home Cleaning",
    description:
      "Friendly, trustworthy residential cleaning for San Francisco and the Peninsula.",
    url: "https://evahomecleaning.com",
    siteName: "Eva Home Cleaning",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/mascot-name-horizontal.png",
        width: 1200,
        height: 630,
        alt: "Eva Home Cleaning logo"
      }
    ]
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32" },
      { url: "/favicon-48.png", sizes: "48x48" }
    ],
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
