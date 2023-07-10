import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { prisma } from "@/base/prisma";
import { getSession } from "@/base/authOptions";

interface RequestContext {
  params: {
    id: string;
  };
}

// Get form
export async function GET(request: NextRequest, ctx: RequestContext) {
  const session = await getSession();
  const formId = ctx.params.id;

  try {
    const form = await prisma.form.findFirst({
      where: {
        id: formId,
        user_id: session.user?.id,
      },
    });

    return NextResponse.json({ form });

    //
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

// Update form
export async function POST(request: NextRequest, ctx: RequestContext) {
  const session = await getSession();
  const formData = await request.json();
  const formId = ctx.params.id;

  try {
    const form = await prisma.form.update({
      where: {
        id: formId,
      },
      data: {
        ...formData,
      },
    });

    return NextResponse.json({ form });
    //
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

// Delete form
export async function DELETE(request: NextRequest, ctx: RequestContext) {
  const session = await getSession();
  const formId = ctx.params.id;

  try {
    await prisma.form.delete({
      where: {
        id: formId,
      },
    });

    return NextResponse.json({ success: "Form deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
