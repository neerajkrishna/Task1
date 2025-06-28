import "./globals.css";
import { ReactNode, useState } from "react";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Image Upload App",
  description: "Upload and manage images",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Delay QueryClient creation until browser-side
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

