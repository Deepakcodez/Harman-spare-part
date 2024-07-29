import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_Components/herosection/Navbar/page";
import { QueryProvider } from "./QueryProvider";
import { Footer } from "./_Components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harman Spare parts",
  description: "Make your vehicle super vehicle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>

          <Navbar />
          {children}
          <Footer />
        </QueryProvider>

        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        
      </body>
    </html>
  );
}