import { FormDetails } from "@/components/form/form-details";

export default function ViewFormPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className="w-full flex flex-col items-center justify-between px-4 lg:px-24 py-12">
      <FormDetails formId={id} />
    </main>
  );
}
