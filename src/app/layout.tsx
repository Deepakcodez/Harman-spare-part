import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_Components/herosection/Navbar/page";
import Providers from "./Providers";
import { QueryProvider } from "./QueryProvider";
import StoreProvider from "./Providers"; // Import StoreProvider

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
          <StoreProvider> 
            <Providers>
              <Navbar />
              {children}
            </Providers>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}