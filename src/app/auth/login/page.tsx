import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Command } from "lucide-react";

import { cn } from "@/base/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/app/auth/components/form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Login to your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login
        </p>
      </div>

      <UserAuthForm type="login" />

      {/*<p className="px-8 text-center text-sm text-muted-foreground">*/}
      {/*  By clicking continue, you agree to our*/}
      {/*  <br />*/}
      {/*  <Link*/}
      {/*    href="/terms"*/}
      {/*    className="underline underline-offset-4 hover:text-primary"*/}
      {/*  >*/}
      {/*    Terms of Service*/}
      {/*  </Link>{" "}*/}
      {/*  and{" "}*/}
      {/*  <Link*/}
      {/*    href="/privacy"*/}
      {/*    className="underline underline-offset-4 hover:text-primary"*/}
      {/*  >*/}
      {/*    Privacy Policy*/}
      {/*  </Link>*/}
      {/*  .*/}
      {/*</p>*/}
    </div>
  );
}
