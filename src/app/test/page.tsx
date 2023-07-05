import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FormsList } from "@/components/dashboard/forms-list";
import { TestForm } from "@/app/test/components/test-form";

export default function TestPage() {
  return (
    <main className="flex flex-col items-center justify-between px-4 lg:px-24 py-12">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-bold">Test form page</h1>
      </div>
      <TestForm />
    </main>
  );
}
