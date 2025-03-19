import Image from "next/image";

import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";

export default async function page({ searchParams }: { searchParams: any }) {
  const wixClient = await wixClientServer();

  const response = await wixClient.collections.getCollectionBySlug(
    searchParams.category || "all-products"
  );

  const categoryId = response.collection?._id!;

  return (
    <div>
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-lama text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      <Filter />

      <h1 className="font-semibold mt-12 text-2xl md:text-3xl px-3 md:px-8">
        {response.collection?.name} For You !
      </h1>
      <Suspense fallback={<Skeleton />}>
        <ProductList
          searchParams={searchParams}
          categoryId={categoryId || "00000000-000000-000000-000000000001"}
        />
      </Suspense>
    </div>
  );
}
