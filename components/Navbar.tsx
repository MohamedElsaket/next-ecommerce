"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Links from "./Links";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Bell, CircleUserRound, LogOut } from "lucide-react";
import Link from "next/link";
import CardModal from "./CardModal";
import MobileNav from "./MobileNav";
import SearchBar from "./SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useWixClient } from "@/hooks/useWixContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar() {
  const wixClient = useWixClient();
  const router = useRouter();

  async function logout() {
    Cookies.remove("refreshToken");

    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    router.push(logoutUrl);
  }

  return (
    <div className="flex justify-between items-center h-20 px-4 md:px-32 lg:px-48 bg-white shadow-md fixed z-50 w-full">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="relative flex items-center gap-2 w-[40px] h-[40px]"
        >
          <Image src={"/logo.png"} alt="Logo" fill className="object-cover" />
        </Link>
        <div className="hidden lg:flex gap-8">
          <Links />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search bar */}
        <SearchBar />

        {/* Icons */}
        <Bell className="text-2xl lg:text-3xl" />

        <CardModal />

        <Popover>
          <PopoverTrigger asChild className="cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2">
            <Button className="flex items-center gap-2" asChild>
              <Link href="/profile">
                <CircleUserRound className="text-white" />
                <span>Profile</span>
              </Link>
            </Button>
            <Button
              className="flex items-center gap-2 bg-red-500"
              onClick={logout}
            >
              <LogOut />
              <span>Logout</span>
            </Button>
          </PopoverContent>
        </Popover>

        {/* Mobile navigation */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
