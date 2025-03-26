"use client";

import { useDispatch } from "react-redux";

import { addItem } from "@/redux/cartSlice";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Add({ product }: { product: any }) {
  // const { items } = useSelector((state: RootState) => state.cart);
  // console.log("items", items);
  const [showDialog, setShowDialog] = useState(false);

  const dispatch = useDispatch();
  const refreshToken = Cookies.get("refreshToken");

  function handleAddProduct(product: any) {
    if (refreshToken) {
      dispatch(addItem(product));
    } else {
      setShowDialog(true);
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button onClick={() => handleAddProduct(product)}>Add to Cart</Button>
        </AlertDialogTrigger>
        {showDialog && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>You need to log in first</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-black">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link href={"/login"}>Log in</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </>
  );
}
