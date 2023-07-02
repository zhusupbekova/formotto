import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FormsList } from "@/components/dashboard/forms-list";

export default function Dashboard() {
  return (
    <main className="flex flex-col items-center justify-between px-4 lg:px-24 py-12">
      <div className="w-full flex items-center justify-between">
        <div />
        <Link
          href="/form/new"
          className={buttonVariants({ variant: "default" })}
        >
          Create new fom
        </Link>
      </div>
      <FormsList />
    </main>
  );
}
