"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NewFooter from "@/components/NewFooter";
import Login_register from "@/components/Login_register/index";
import Layout from "@/components/Layout/layout";
import { Providers } from "./redux/provider";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
          <Layout>
            <Login_register setLoggedIn={setLoggedIn} />
            {children}
          </Layout>
          <NewFooter />
        </Providers>
      </body>
    </html>
  );
}
