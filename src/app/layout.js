import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { SSEStream } from "@/SSE/subject";
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
  title: "MoonAccedmy",
  description: "Moon Academy Website",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <SSEStream> */}
          <Navbar />
          <ScrollToTop />
          {children}
          <Toaster richColors position="top-right" />
        {/* </SSEStream> */}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;