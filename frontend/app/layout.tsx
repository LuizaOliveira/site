import type { Metadata } from "next";
import { Geist, Geist_Mono, Red_Hat_Text, Arimo } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const redHatText = Red_Hat_Text({
  variable: "--font-red-hat-text",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Clodonil Monteiro - Advocacia para Servidores Públicos",
  description: "Advocacia especializada em defesa dos direitos de servidores públicos. Acompanhe as principais notícias e atualizações do setor.",
  keywords: "advocacia, servidor público, direitos, notícias, atualizações, clodonil monteiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${redHatText.variable} ${arimo.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
