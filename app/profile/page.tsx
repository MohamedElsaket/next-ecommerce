"use client";

// import { useWixClient } from "@/hooks/useWixContext";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function page() {
  // THIS CODE SHOULD BE FROM WIX STUDIO BUT THERE'S SOMTHING WRONG WITH WIX BUILT IN FUNCTIONS (getMemberTokensForDirectLogin())

  // const wixClient = useWixClient();

  // const loggedIn = wixClient.auth.loggedIn();
  // if (!loggedIn) {
  //   router.push("/login");
  // }

  const router = useRouter();

  if (!Cookies.get("refreshToken")) router.push("/login");

  return (
    <div>
      <h2>Profile Page</h2>
    </div>
  );
}
