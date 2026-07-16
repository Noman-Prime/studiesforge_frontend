import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import ScrollToTop from "@/components/scrollToTop";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/app/context/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://studiesforge.com"),
  title: {
    default: "StudiesForge | Learn, Practice & Achieve",
    template: "%s | StudiesForge",
  },
  description:
    "StudiesForge is an online learning platform for MDCAT, NUMS, ECAT and board exam preparation with chapter-wise MCQs, notes, quizzes, past papers and video lectures.",
  applicationName: "StudiesForge",
  keywords: [
    "StudiesForge",
    "MDCAT",
    "NUMS",
    "ECAT",
    "MCQs",
    "Past Papers",
    "Notes",
    "Video Lectures",
    "Online Learning",
    "Pakistan Education",
  ],
  authors: [{ name: "StudiesForge" }],
  creator: "StudiesForge",
  publisher: "StudiesForge",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "StudiesForge | Learn, Practice & Achieve",
    description:
      "Prepare for MDCAT, NUMS, ECAT and board exams with high-quality study resources.",
    url: "https://studiesforge.com",
    siteName: "StudiesForge",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudiesForge",
    description:
      "Online learning platform for MDCAT, NUMS and ECAT preparation.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-full overflow-x-hidden bg-background font-sans text-foreground antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <ScrollToTop />
          <main className="w-full">
            {children}
          </main>
          <Footer />
        </AuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}