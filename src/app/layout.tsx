import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sarone Coffee Shop",
  description: "Savor the perfect brew",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <footer className="bg-coffee-900 text-coffee-200 py-8 text-center mt-auto">
           <p>&copy; {new Date().getFullYear()} Sarone Coffee. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}