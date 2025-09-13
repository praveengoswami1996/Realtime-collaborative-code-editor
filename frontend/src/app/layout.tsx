import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import { Toaster } from "react-hot-toast";
import AppLayout from "@/layouts/AppLayout";
import ReduxProvider from "@/providers/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Realtime Collaborative Code Editor",
  description: "A platform for realtime collaborative code editing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppLayout>
          <ReactQueryClientProvider>
            <ReduxProvider>
              <main>{children}</main>
            </ReduxProvider>
          </ReactQueryClientProvider>
        </AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
