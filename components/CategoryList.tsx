import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryList() {
  const wixContext = wixClientServer();

  const { items } = await (await wixContext).collections
    .queryCollections()
    .find();

  // const length = 60;

  return (
    <div className=" px-4 overflow-x-scroll scrollbar-hide">
      <div className="overflow-x-scroll scrollbar-hide">
        <div className="flex gap-4 md:gap-8">
          {items.map((category) => (
            <Link
              href={`/list?category=${category.slug}`}
              key={category._id}
              className="group flex flex-col gap-4 rounded-md overflow-hidden shadow-md bg-slate-100 min-w-48 sm:min-w-64 md:min-w-72"
            >
              <div className="h-48 sm:h-64 md:h-72 w-full relative overflow-hidden">
                <Image
                  src={category.media?.mainMedia?.image?.url || "/category.png"}
                  alt={""}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-4 p-2 py-4">
                <div className="flex justify-between items-center font-bold">
                  <h3 className="text-lg sm:text-xl md:text-2xl">
                    {category.name}
                  </h3>
                </div>
                {/* <p className="text-slate-600 text-sm sm:text-md md:text-lg">
                  {category.description && category.description.length > length
                    ? `${category.description?.slice(0, length)}...`
                    : category.description}
                </p> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
