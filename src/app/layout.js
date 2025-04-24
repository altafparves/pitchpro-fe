// src/app/layout.js
import { ReduxProvider } from "@/redux/provider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Main Layout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <div className="flex flex-col  min-h-screen">
            <main className="flex-1 bg-neutral-50">{children}</main>
            <Navbar />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
