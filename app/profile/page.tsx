"use client";

import { useWixClient } from "@/hooks/useWixContext";
import { useRouter } from "next/navigation";

export default function page() {
  const wixClient = useWixClient();
  const router = useRouter();

  const loggedIn = wixClient.auth.loggedIn();
  if (!loggedIn) {
    router.push("/login");
  }

  return <div>Profile Page</div>;
}
