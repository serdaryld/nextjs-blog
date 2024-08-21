import React from 'react';
import { Layout } from '@/components';
import { Raleway, Montserrat, Bitter } from "next/font/google";
import "./globals.scss";

const bitter = Bitter({ subsets: ["latin"] });

export const metadata = {
  title: "Connavale",
  description: "A blog site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={bitter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
