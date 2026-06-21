import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { I18nProvider } from "@/providers/i18n-provider";
import { CartProvider } from "@/context/CartContext";
import { CartButton, CartDrawer, CartSummaryBar } from "@/components/cart/Cart";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Bella Cucina",
  description: "Authentic Italian fine dining in the heart of the city.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <CartProvider>
          <I18nProvider>{children}</I18nProvider>
          <CartButton />
          <CartSummaryBar />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
