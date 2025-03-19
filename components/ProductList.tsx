import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import Add from "./Add";

export default async function ProductList({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .lt("priceData.price", searchParams?.max || 9999999)
    .gt("priceData.price", searchParams?.min || 0)
    .limit(8);

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  const data = res.items;

  // const filteredData = data.filter(
  //   (item) => item.productType === searchParams.type
  // );
  // console.log(filteredData);

  const length = 60;

  return (
    <div className="py-12 px-4 md:px-32 lg:px-48">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 md:gap-12">
        {data.map((product: products.Product) => (
          <div
            key={product._id}
            className="group flex flex-col rounded-md overflow-hidden shadow-md bg-slate-100"
          >
            <Link
              href={"/" + product.slug}
              className="relative h-48 sm:h-64 md:h-72 w-full"
            >
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt={""}
                fill
                className="object-cover group-hover:opacity-0 z-20 transition-all duration-300"
              />
              {product.media?.items && (
                <Image
                  src={product.media?.items[1]?.image?.url || "/product.png"}
                  alt={""}
                  fill
                  className="object-cover absolute top-0 left-0"
                />
              )}
            </Link>
            <div className="flex flex-col gap-2 md:gap-4 p-2 sm:p-4">
              <div className="flex justify-between items-center font-bold">
                <h3 className="text-md sm:text-xl">{product.name}</h3>
                <p>${product.priceData?.price || "0"}</p>
              </div>
              <p className="text-slate-600 text-sm sm:text-md md:text-lg">
                {product.description && product.description.length > length
                  ? `${product.description?.slice(0, length)}...`
                  : product.description}
              </p>
              <Add product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
