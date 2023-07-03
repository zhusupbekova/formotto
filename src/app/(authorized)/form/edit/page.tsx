import { FormDetails } from "@/components/form/form-details";

export default function EditFormPage({ searchParams }) {
  console.log(searchParams);
  return (
    <main className="flex flex-col items-center justify-between px-4 lg:px-24 py-12">
      <EditForm formId={searchParams.id} />
    </main>
  );
}
