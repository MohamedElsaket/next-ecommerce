"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const wixClient = useWixClient();
  const router = useRouter();
  const [showVerification, setShowVerification] = useState(false);
  const [loasding, setLoasding] = useState(false);

  console.log("HELLOOOOOOO");

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
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
        router.push("/");
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
