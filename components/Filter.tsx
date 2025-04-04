"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(e: any) {
    const { name, value } = e.target;

    console.log(name, value);
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="px-4 py-4 bg-gray-100 pt-24">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Filters</h1>
      <div className="flex justify-between items-center gap-4  flex-wrap">
        <Select
          onValueChange={(value) =>
            handleFilter({ target: { name: "type", value } })
          }
        >
          <SelectTrigger className="w-[100px] md:w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="physical">Physical</SelectItem>
              <SelectItem value="digital">Digital</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="min price"
          name="min"
          className="w-[100px] md:w-[180px]"
          onChange={handleFilter}
        />
        <Input
          type="text"
          placeholder="max price"
          name="max"
          className="w-[100px] md:w-[180px]"
          onChange={handleFilter}
        />

        <Select
          onValueChange={(value) =>
            handleFilter({ target: { name: "cat", value } })
          }
        >
          <SelectTrigger className="w-[100px] md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="category">Category</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            handleFilter({ target: { name: "sort", value } })
          }
        >
          <SelectTrigger className="w-[100px] md:w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="asc price">Price (low to high)</SelectItem>
              <SelectItem value="desc price">Price (high to low)</SelectItem>
              <SelectItem value="asc lastUdated">Newest</SelectItem>
              <SelectItem value="desc lastUdated">Oldest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
