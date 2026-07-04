import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import ScrollToTop from "@/components/scrollToTop";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MoonAcademy",
  description: "Moon Academy Website",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-foreground antialiased`}
      >
        <Navbar />
        <ScrollToTop />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
};

export default RootLayout;