// "use client";

import { Suspense } from "react";

import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";

export default async function Home() {
  return (
    <div className="">
      <Slider />
      <div className="">
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl py-12 md:pb-20 px-4 md:px-32 lg:px-48">
          Featured Products
        </h2>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={8}
          />
        </Suspense>
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl py-12 md:pb-20 px-4 md:px-32 lg:px-48">
          Categories
        </h2>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
    </div>
  );
}
