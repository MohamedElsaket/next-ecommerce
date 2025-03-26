"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useWixClient } from "@/hooks/useWixContext";
import { logInSchema } from "@/schema/validation";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const wixClient = useWixClient();
  const router = useRouter();
  const [errorMassage, setErrorMassage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    errors: {
      email: {
        message: errorMassage,
      } as any,
    },
  });

  async function onSubmit(values: z.infer<typeof logInSchema>) {
    setIsLoading(true);
    // console.log("Submitted values: ", values);

    try {
      let response = await wixClient.auth.login({
        email: values.email,
        password: values.password,
      });

      console.log("Full Response", response);

      if (response?.loginState === "SUCCESS") {
        if (!Cookies.get("refreshToken")) {
          // ↓↓↓ THIS CODE SHOULD BE FROM WIX STUDIO BUT THERE'S SOMTHING WRONG WITH WIX BUILT IN FUNCTIONS (getMemberTokensForDirectLogin())

          // const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
          //   response.data.sessionToken!
          // );

          const tokens = {
            accessToken: Math.floor(
              10000000000000 + Math.random() * 90000000000000
            ).toString(),
            refreshToken: Math.floor(
              10000000000000 + Math.random() * 90000000000000
            ).toString(),
          };

          wixClient.auth.setTokens(tokens as any);

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
        }

        router.push("/");

        toast.success("Logged in successfully");
      } else if (
        response?.loginState === "FAILURE" &&
        response?.errorCode === "invalidPassword"
      ) {
        setErrorMassage(response?.errorCode || "Something went wrong");
        // wixClient.auth.sendPasswordResetEmail(
        //   values.email,
        //   "https://localhost:3000/login"
        // );
      } else {
        console.log("Something went wrong");
        setErrorMassage("Something went wrong");
      }
    } catch (error: any) {
      console.log(error);
      console.log("Error Response:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm md:text-lg">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your E-mail..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm md:text-lg">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter Your Password..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-1 text-sm">
          <p>Do not have account?</p>
          <Link href={"/signup"} className="underline">
            create account
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={isLoading ? "opacity-95" : "opacity-100"}
        >
          {isLoading ? "Loading..." : "Log in"}
        </Button>
      </form>
    </Form>
  );
}

// 1. if the errorCode = invalidPassword, go to path 'restPassword'
// 2. Create a new page called 'restPassword' and create a new component called 'RestPasswordForm'
// 3. Create a new schema called 'restPasswordSchema'

// Go t line 88
