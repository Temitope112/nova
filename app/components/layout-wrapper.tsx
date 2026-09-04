"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hidePublicChrome =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin");

  return (
    <>
      {!hidePublicChrome && <Navbar />}

      {children}

      {!hidePublicChrome && <Footer />}
    </>
  );
}