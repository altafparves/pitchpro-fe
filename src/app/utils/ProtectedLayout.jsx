"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return <div>Checking authentication...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
}
