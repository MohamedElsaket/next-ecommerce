"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductImages({ item }: { item: any }) {
  // console.log(item);

  const [mainImage, setMainImage] = useState(item.mainMedia?.image?.url);

  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={mainImage}
          alt="Product Image"
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {item.items.map((image: any) => (
          <div
            key={image._id}
            className="w-1/4 h-[100px] relative cursor-pointer"
          >
            <Image
              src={image?.image?.url}
              alt="Product Image"
              fill
              sizes="30vw"
              className="object-cover rounded-md"
              onClick={() => setMainImage(image?.image?.url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
