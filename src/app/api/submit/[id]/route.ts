import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/base/prisma";

interface RequestContext {
  params: {
    id: string;
  };
}
export async function POST(request: NextRequest, ctx: RequestContext) {
  const formId = ctx.params.id;
  const formData = await request.json();

  try {
    const submission = await prisma.submission.create({
      data: {
        form_id: formId,
        fields: { created_at: Date.now(), ...formData },
      },
    });

    return NextResponse.json({ submission });

    //
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err });
  }
}
