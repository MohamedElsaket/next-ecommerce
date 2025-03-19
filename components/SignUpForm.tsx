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
import { signUpSchema } from "@/schema/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";

type WixAuthResponse = {
  loginState: string;
  data: {
    sessionToken: string;
  };
};

export default function SignUpForm() {
  const wixClient = useWixClient();
  const router = useRouter();
  const [showVerification, setShowVerification] = useState(false);
  const [loasding, setLoasding] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log("Submitted values: ", values);

    try {
      let response = (await wixClient.auth.register({
        email: values.email,
        password: values.password,
      })) as WixAuthResponse;

      console.log("Full Response", response);

      console.log("Session Token", response.data.sessionToken);

      Cookies.set("test cookie", "Signed up");

      if (response?.loginState === "SUCCESS") {
        const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
          response.data.sessionToken!
        );
        console.log(tokens.accessToken);
        console.log(tokens.refreshToken);

        Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
          expires: 2,
        });
        wixClient.auth.setTokens(tokens);
        console.log("Redirecting to home...");
        // router.push("/");
      } else {
        console.log("smthg wrong");
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

        {/* {showVerification && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )} */}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
