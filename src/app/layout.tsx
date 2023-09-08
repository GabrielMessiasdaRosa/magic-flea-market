import NewsAlert from "@/components/news-alert";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import AuthProvider from "./auth-provider";
import "./globals.css";
const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "mfm | Magic flea market",
  description:
    "O lugar ideal para negociar suas cartas de Magic: The Gathering",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={ubuntu.className}>
          <NewsAlert />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
