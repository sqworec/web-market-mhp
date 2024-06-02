import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "@/components/background";
import Navbar from "@/app/(home)/_components/navbar/navbar";
import Footer from "@/app/(home)/_components/footer/footer";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import "@uploadthing/react/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Минскхлебпром",
    description: "Дада",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="en">
            <body className={`${inter.className} min-h-screen flex flex-col`}>
            <Background />
            <Navbar />
            <Toaster position={"top-center"} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            </body>
            </html>
        </SessionProvider>
    );
}
