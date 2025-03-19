"use client";

import { useDispatch } from "react-redux";

import { addItem } from "@/redux/cartSlice";
import { Button } from "./ui/button";

export default function Add({ product }: { product: any }) {
  // const { items } = useSelector((state: RootState) => state.cart);
  // console.log("items", items);

  const dispatch = useDispatch();

  function handleAddProduct(product: any) {
    dispatch(addItem(product));
  }

  return <Button onClick={() => handleAddProduct(product)}>Add to Cart</Button>;
}
