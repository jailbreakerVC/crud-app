import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CRUD Application in next js",
  description: "by Vijit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <nav className="p-4 flex justify-between">
            <h1 className="text-xl font-bold">Users database</h1>
            <ThemeToggle />
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
