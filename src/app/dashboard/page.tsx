import { Button, buttonVariants } from "@/components/ui/button";
import { FormCard } from "@/components/dashboard/form-card";
import Link from "next/link";

const data = [
  { id: 1, name: "Form #1", totalSubmissions: 100, newSubmissions: 2 },
  { id: 2, name: "Form #2", totalSubmissions: 100, newSubmissions: 2 },
  { id: 3, name: "Form #3", totalSubmissions: 400, newSubmissions: 0 },
  { id: 4, name: "Form #4", totalSubmissions: 140, newSubmissions: 4 },
];

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
      <div className="w-full space-y-6 pt-12">
        {data.map((formItem) => (
          <FormCard formItem={formItem} key={formItem.id} />
        ))}
      </div>
    </main>
  );
}
