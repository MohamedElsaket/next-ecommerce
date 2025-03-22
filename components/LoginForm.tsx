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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function LoginForm() {
  const wixClient = useWixClient();
  const router = useRouter();
  const [errorMassage, setErrorMassage] = useState("");
  const [loasding, setLoasding] = useState(false);

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
    console.log("Submitted values: ", values);

    try {
      let response = await wixClient.auth.login({
        email: values.email,
        password: values.password,
      });

      console.log("Full Response", response);

      if (response?.loginState === "SUCCESS") {
        if (!Cookies.get("refreshToken")) {
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
        }

        router.push("/");
      } else if (response?.loginState === "FAILURE") {
        setErrorMassage(response?.errorCode || "Something went wrong");
      } else {
        console.log("Something went wrong");
      }
    } catch (error: any) {
      console.log(error);
      console.log("Error Response:", error.response?.data || error.message);
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
