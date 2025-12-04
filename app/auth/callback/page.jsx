"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      router.replace("/home");
    } else {
        router.replace("/signin");
    }
  }, [router]);

  return <p>Logging you in...</p>;
};

export default CallbackPage;
