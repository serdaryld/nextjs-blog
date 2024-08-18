import React from 'react';
import { Layout } from '@/components';
import { Raleway, Montserrat } from "next/font/google";
import "./globals.scss";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Blogg",
  description: "A blog site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
