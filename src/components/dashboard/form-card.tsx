"use client";

import { ActionButton, CopyButton } from "@/components/action-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { IForm } from "@/base/types";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import { deleter } from "@/base/network";
import { useState } from "react";
import { useSWRConfig } from "swr";

export function FormCard({ formItem }: { formItem: IForm }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { trigger, isMutating } = useSWRMutation(
    `/api/forms/${formItem.id}`,
    deleter
  );
  const { mutate } = useSWRConfig();

  const formEndpointUrl = `https://formotto/submit/${formItem.id}`;

  return (
    <Card className="relative w-full flex justify-between">
      <CardHeader>
        <Link href={`/form/view?id=${formItem.id}`} className="cursor-pointer">
          <CardTitle>{formItem.name}</CardTitle>
        </Link>
        <CardDescription className="flex items-center space-x-2">
          <span>{formEndpointUrl}</span> <CopyButton data={formEndpointUrl} />
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 hidden md:flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Icons.edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger
            className={buttonVariants({ variant: "danger", size: "icon" })}
          >
            <Icons.trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                <span className="font-bold mx-1">{formItem.name}</span>and
                remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={(e) => {
                  onDelete(e);
                }}
                disabled={loading}
                className={buttonVariants({ variant: "destructive" })}
              >
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
  );

  async function onDelete(e) {
    try {
      e.preventDefault();
      setLoading(true);
      console.log("deleting");

      await trigger();
      console.log("getting rest");

      await mutate("/api/forms");
      console.log("closings");
      setLoading(false);
      return setOpen(false);
    } catch (err) {
      console.log(err);
    }
  }
}
