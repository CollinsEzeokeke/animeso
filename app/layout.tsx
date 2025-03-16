import { Monitoring } from "react-scan/monitoring/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactLenis } from "@/lib/utils";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Animeso",
  description: "clone of amie.so",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* other head tags */}
        <Script
          src="https://unpkg.com/react-scan/dist/install-hook.global.js"
          strategy="beforeInteractive"
        />
      </head>
      <ReactLenis root>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#BFBFBF] w-full overflow-x-hidden`}
        >
          <Monitoring
            apiKey="9pnr_sbvb1KvQBIzgjVlauRK3pY2yEv_" // Safe to expose publically
            url="https://monitoring.react-scan.com/api/v1/ingest"
            commit={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA} // optional but recommended
            branch={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF} // optional but recommended
          />
            {children}
        </body>
      </ReactLenis>
    </html>
  );
}
