


import { Inter } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inventario",
  description: "Sistema de inventario",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      
      <body className=" bg-[#171821]">
       <SessionAuthProvider>
       {children}
       </SessionAuthProvider>
       
      
        
        
        </body>
    </html>
  );
}
