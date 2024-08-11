

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inventario",
  description: "Sistema de inventario",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="min-h-screen flex justify-center items-center bg-white">{children}</body>
    </html>
  );
}
