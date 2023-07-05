import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { prisma } from "@/base/prisma";
import { getSession } from "@/base/authOptions";

interface RequestContext {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, ctx: RequestContext) {
  const session = await getSession();
  const formId = request.nextUrl.searchParams.get("formId");

  try {
    // Get form
    if (formId) {
      const form = await prisma.form.findFirst({
        where: {
          id: formId,
          user_id: session.user?.id,
        },
      });

      return NextResponse.json({ form });
    } else {
      // Get all forms
      const forms = await prisma.form.findMany({
        where: { user_id: session.user?.id },
      });

      return NextResponse.json({ forms });
    }
    //
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function POST(request: NextRequest, ctx: RequestContext) {
  const session = await getSession();
  const formData = await request.json();
  const formId = request.nextUrl.searchParams.get("formId");

  try {
    // Update form
    if (formId) {
      const form = await prisma.form.update({
        where: {
          id: formId,
        },
        data: {
          ...formData,
        },
      });

      return NextResponse.json({ form });
    } else {
      // Create form
      const form = await prisma.form.create({
        data: { ...formData, user_id: session.user?.id },
      });

      return NextResponse.json({ success: "Form created successfully", form });
    }
    //
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  const session = await getSession();
  const formId = request.nextUrl.searchParams.get("formId");

  try {
    await prisma.form.delete({
      where: {
        id: formId,
      },
    });
    console.log("DELETE");

    return NextResponse.json({ success: "Form deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
