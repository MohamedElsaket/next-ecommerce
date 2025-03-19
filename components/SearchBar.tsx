"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search");

    if (search) {
      router.push(`/list?name=${search}`);
    }

    // console.log("Search submitted");
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <Input
        type="text"
        name="search"
        placeholder="Search..."
        className="hidden lg:flex gap-8 min-w-[300px]"
      />
      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ">
        <Image
          src={"/search.png"}
          alt="Search"
          width={20}
          height={20}
          className="opacity-55 hover:opacity-100 transition-opacity"
        />
      </button>
    </form>
  );
}
