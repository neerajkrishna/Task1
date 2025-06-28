"use client"; // ✅ This makes it a Client Component

import "./globals.css";
import { ReactNode, useState } from "react";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={client}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
