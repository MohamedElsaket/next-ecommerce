"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  clearItems,
  decreaseItem,
  increaseItem,
  removeItem,
} from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function CardModal() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  // console.log("items", items);

  function handleRemoveProduct(id: number) {
    const selectedProduct = items.filter((item) => item._id === id);
    // console.log(selectedProduct[0]);

    dispatch(removeItem(selectedProduct[0]));
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <div className="relative">
          <ShoppingCart className="text-2xl lg:text-3xl" />
          <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white bg-red-400">
            {items.length}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle className="font-bold text-2xl md:text-3xl">
            Shopping Cart
          </SheetTitle>
          <SheetDescription>
            Your card details are safe with us. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <div className="px-4">
          {items.length && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-red-600 hover:bg-red-500 my-6 w-full"
                >
                  Delete all
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete all products from cart?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    all products from the cart.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-black">
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    variant="outline"
                    className="bg-red-600 hover:bg-red-500"
                    onClick={() => dispatch(clearItems())}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {/* Check out */}
          <div className="flex justify-between items-center font-bold py-3 border-y border-slate-900">
            <p>Total Price</p>
            <p>$ {items.reduce((acc, item) => acc + item.price.price, 0)}</p>
          </div>
        </div>

        <div className="relative w-full px-4 overflow-scroll">
          {/* Cards */}
          {items.length ? (
            items.map((item) => (
              <div key={item._id} className="border-b border-slate-900 py-8 ">
                <div className="flex gap-2">
                  <div className="relative w-[100px] h-[150px] flex-1">
                    <Image
                      src={item.media.mainMedia.image.url}
                      alt="Product"
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-2">
                    <div className="flex flex-col justify-between gap-2 h-full">
                      <div className="flex justify-between items-center">
                        <p>{item.name}</p>
                        <p>${item.price.price}</p>
                      </div>
                      <p className="text-slate-600 text-sm">
                        {/* Quantity */}
                        <Button
                          variant="outline"
                          className="h-6 w-6 p-0 rounded-full text-black"
                          onClick={() => dispatch(increaseItem(item))}
                        >
                          +
                        </Button>
                        <span className="px-3">{item.quantity}</span>
                        <Button
                          variant="outline"
                          className={"h-6 w-6 p-0 rounded-full text-black"}
                          onClick={() => dispatch(decreaseItem(item))}
                          disabled={item.quantity == 1}
                        >
                          -
                        </Button>
                      </p>

                      <div className="ml-auto">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="bg-red-600 hover:bg-red-500"
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the product from the cart.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="text-black">
                                Cancel
                              </AlertDialogCancel>
                              <Button
                                variant="outline"
                                className="bg-red-600 hover:bg-red-500"
                                onClick={() => handleRemoveProduct(item._id)}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl py-8"> Your Cart Still Empty ... </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
