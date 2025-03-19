import { WixClientContext } from "@/context/wixContext";
import { useContext } from "react";

export function useWixClient() {
  return useContext(WixClientContext);
}
