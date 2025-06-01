import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/components/providers/language-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: {
    default: "Local Services Matcher - Find Trusted Help in Riga",
    template: "%s | Local Services Matcher"
  },
  description: "Book babysitters, pet sitters, cleaners, and handymen in Riga. Trusted local professionals at your service.",
  keywords: ["babysitter riga", "cleaner riga", "handyman riga", "pet sitter riga", "dog walker riga"],
  authors: [{ name: "Ruslan" }],
  creator: "Ruslan",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["lv_LV", "ru_RU"],
    url: "https://localservices.lv",
    title: "Local Services Matcher - Find Trusted Help in Riga",
    description: "Book verified professionals for your home and family",
    siteName: "Local Services Matcher"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
