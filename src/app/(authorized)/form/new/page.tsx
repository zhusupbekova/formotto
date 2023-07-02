import { Separator } from "@/components/ui/separator";
import * as React from "react";
import { NewForm } from "@/components/form/new-form";

export default function FormPage() {
  return (
    <main className="flex flex-col items-center justify-between px-4 lg:px-24 py-12">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">New form</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
        <NewForm />
      </div>
    </main>
  );
}
