"use client";

import { ActionButton, CopyButton } from "@/components/action-button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/base/utils";
import { IFormItem } from "@/base/types";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";

export function FormCard({ formItem }: { formItem: IFormItem }) {
  const formEndpointUrl = `https://formotto/submit/${formItem.id}`;
  return (
    // <TooltipProvider>
    <Card className="relative w-full flex justify-between">
      <CardHeader>
        <CardTitle>{formItem.name}</CardTitle>
        <CardDescription className="flex items-center space-x-2">
          <span>{formEndpointUrl}</span> <CopyButton data={formEndpointUrl} />
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 hidden md:flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Icons.edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button variant="danger" size="icon">
          <Icons.trash className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </CardContent>
      <CardContent className="pt-6 flex md:hidden items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-9 px-0">
              <Icons.sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Icons.moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("light")}>
              <Icons.edit className="h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("dark")}>
              <Icons.trash className="h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("system")}>
              <Icons.laptop className="mr-2 h-4 w-4" />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
      {formItem.newSubmissions > 0 && (
        <Badge
          variant="secondary"
          className="absolute top-0 right-4 -translate-y-1/2 "
        >
          {formItem.newSubmissions} new submissions
        </Badge>
      )}
    </Card>
    // </TooltipProvider>
  );
}
