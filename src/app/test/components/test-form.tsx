"use client";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/icons";

import { Input } from "@/components/ui/input";
import * as React from "react";
import useSWRMutation from "swr/mutation";
import { poster } from "@/base/network";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string({
    required_error: "Please enter a name for form.",
  }),
  redirect_url: z.string().url().optional(),
  emails: z.string().optional(),
});

type formValues = z.infer<typeof formSchema>;

export function TestForm() {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    "/api/submit/cljmjq8t70005ro2zv13mx5vl",
    poster
  );

  // gives error <z.infer<typeof formSchema>
  // const form = useForm<z.infer<typeof formSchema>>({

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      emails: "",
      redirect_url: undefined,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500 ">
                Name
              </FormLabel>
              <FormControl>
                <Input placeholder="My form" {...field} />
              </FormControl>
              <FormDescription>
                This field is for your display only.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emails</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="my@email.com, johnwick@continental.com"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Comma separated emails you want form submissions to be sent to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="redirect_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Redirect URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://myawesomewebsite.com/thank_you"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Where you want to redirect user after submitting form.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isMutating}>
          {isMutating && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create form
        </Button>
      </form>
    </Form>
  );

  async function onSubmit(values: formValues) {
    try {
      const emails = values.emails ? values.emails?.trim().split(", ") : [];
      const formData = await trigger({
        name: values.name,
        redirect_url: values.redirect_url,
        emails,
      });
      //
    } catch (err) {
      console.log(err);
      //
    }
  }
}
