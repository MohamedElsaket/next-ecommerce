"use client";

// import { useWixClient } from "@/hooks/useWixContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function page() {
  // THIS CODE SHOULD BE FROM WIX STUDIO BUT THERE'S SOMTHING WRONG WITH WIX BUILT IN FUNCTIONS (getMemberTokensForDirectLogin())

  // const wixClient = useWixClient();

  // const loggedIn = wixClient.auth.loggedIn();
  // if (!loggedIn) {
  //   router.push("/login");
  // }

  const router = useRouter();

  if (!Cookies.get("refreshToken")) router.push("/login");

  return <div>Profile Page</div>;
}
