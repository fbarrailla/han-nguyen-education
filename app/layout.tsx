import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Han Nguyen — Education Consultant | Study Abroad Vietnam",
  description:
    "Han Nguyen helps Vietnamese students achieve their dream of studying in the USA, UK, Canada, Australia, Singapore, and Europe. Expert visa support, university applications, and English language preparation.",
  keywords:
    "study abroad Vietnam, education consultant Vietnam, US university Vietnam, visa application, IELTS TOEIC preparation, Han Nguyen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SXQSV07FR1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SXQSV07FR1');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <p className="text-gray-500 text-lg tracking-wide">Maintenance in progress</p>
        </div>
        {children}
      </body>
    </html>
  );
}
