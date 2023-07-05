"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/base/utils";
import { Button, buttonVariants } from "@/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    key: string;
    title: string;
  }[];
  current: string;
  setCurrent: (key: string) => void;
}

export function SidebarNav({
  className,
  items,
  current,
  setCurrent,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();
  console.log(current, items);
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.key}
          onClick={() => setCurrent(item.key)}
          variant="ghost"
          className={cn(
            current === item.key
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Button>
      ))}
    </nav>
  );
}
