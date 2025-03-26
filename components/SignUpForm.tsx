"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
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
import { signUpSchema } from "@/schema/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUpForm() {
  const wixClient = useWixClient();
  const router = useRouter();
  const [errorMassage, setErrorMassage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    errors: {
      email: {
        message: errorMassage,
      } as any,
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    // console.log("Submitted values: ", values);

    try {
      let response = await wixClient.auth.register({
        email: values.email,
        password: values.password,
      });

      // console.log("Full Response", response);

      if (response.loginState === "SUCCESS") {
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

        router.push("/");

        toast.success("Welcome, Registered successfully");
      } else {
        setErrorMassage("Email already exists");
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm md:text-lg">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Full Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <Button
          type="submit"
          disabled={isLoading}
          className={isLoading ? "opacity-95" : "opacity-100"}
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
