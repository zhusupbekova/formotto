"use client";

import Link from "next/link";
import { cn } from "@/base/utils";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export function NavLink() {
  const pathname = usePathname();
  const slug = pathname.endsWith("register") ? "/login" : "/register";
  const name = pathname.endsWith("register") ? "Login" : "Register";
  return (
    <Link
      href={`/auth${slug}`}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute right-4 top-4 md:right-8 md:top-8"
      )}
    >
      {name}
    </Link>
  );
}
