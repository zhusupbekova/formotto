"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/base/utils";
import { buttonVariants } from "@/components/ui/button";

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
