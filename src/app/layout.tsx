import NewsAlert from "@/components/news-alert";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mfm | Magic flea market",
  description:
    "O lugar ideal para negociar suas cartas de Magic: The Gathering",
  icons: {
    icon: "/images/favicon.ico",
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className}`}>
        <Providers>
          <NewsAlert />
          {children}
        </Providers>
      </body>
    </html>
  );
}
