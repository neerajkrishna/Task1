import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./Providers"; // import the wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Image Upload App",
  description: "Upload and manage images",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
