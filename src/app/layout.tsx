import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Task Management",
  description: "A simple task management application",
  icons: {
    icon: '/task-management.png',
    apple: '/task-management.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/task-management.png" />
      </head>
      <body 
        className={`${inter.variable} min-h-screen bg-background antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
