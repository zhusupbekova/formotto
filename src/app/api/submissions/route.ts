import { uniq } from "lodash";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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
  const skip = request.nextUrl.searchParams.get("page") ?? 0;
  const take = request.nextUrl.searchParams.get("perPage") ?? 10;

  try {
    // Get form
    const form = await prisma.form.findFirst({
      where: { id: formId },
      select: { name: true },
    });

    //Get submission
    const submissions = await prisma.submission.findMany({
      where: {
        form_id: formId,
      },
      skip,
      take,
    });

    const submissionKeys = uniq(
      submissions.flatMap((s) => s.fields).flatMap(Object.keys)
    );

    return NextResponse.json({ submissions, submissionKeys, form });

    //
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err });
  }
}
