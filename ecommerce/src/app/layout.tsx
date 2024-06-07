import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Header from "./Components/Header";
import dynamic from "next/dynamic";
import { AuthProvider } from "../auth/auth-context";
 
 
const ReduxProvider = dynamic(
  () => import('@/redux/redux-provider'),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce",
  description: "MiniProject",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ReduxProvider>
        <AuthProvider>
        {children}
        </AuthProvider>
        </ReduxProvider>
        </body>
    </html>
  );
}
