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
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { TooltipContent } from "@/components/ui/tooltip";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

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
      <CardContent className="pt-6 flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Icons.edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        {/*<Tooltip>*/}
        {/*  <TooltipTrigger>*/}
        <Button variant="danger" size="icon">
          <Icons.trash className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
        {/*  </TooltipTrigger>*/}
        {/*  <TooltipContent>*/}
        {/*    <p>Delete</p>*/}
        {/*  </TooltipContent>*/}
        {/*</Tooltip>*/}
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
