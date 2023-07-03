import { FormDetails } from "@/components/form/form-details";

export default function ViewFormPage({ searchParams }) {
  console.log("ododo", { searchParams });

  return (
    <main className="flex flex-col items-center justify-between px-4 lg:px-24 py-12">
      hi,{searchParams.id}
      <FormDetails formId={searchParams.id} />
    </main>
  );
}
