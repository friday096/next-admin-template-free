"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();  

  useEffect(() => {
    const pathname = window.location.pathname;  

    if (pathname === "/" || pathname === "/login") {
      router.push("/login");  
    }
  }, [router]);  

  return <></>;
}
