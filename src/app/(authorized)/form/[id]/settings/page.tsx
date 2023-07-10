import Link from "next/link";
import { Metadata } from "next";

import { cn } from "@/base/utils";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormSettings } from "@/components/form/settings/form-settings";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

export default function FormSettingsPage({ params }) {
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <div className="flex items-center">
            <Link
              href={`/form/${params.id}`}
              className={cn(buttonVariants({ variant: "link" }), "-ml-4 -mb-1")}
            >
              <Icons.chevronLeft className="h-6 w-6" />
            </Link>
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          </div>
          <p className="text-muted-foreground">
            Manage your form settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <FormSettings formId={params.id} />
      </div>
    </>
  );
}
