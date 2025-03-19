import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/redux/ReduxProvider";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <Navbar />
      {children}
      <Footer />
    </ReduxProvider>
  );
}
