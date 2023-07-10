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

interface IError {}

export async function GET(request: NextRequest, ctx: RequestContext) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "" });
  }
  const formId = ctx.params.id;
  const skip = request.nextUrl.searchParams.get("page")
    ? request.nextUrl.searchParams.get("page") - 1
    : 0;
  const take = request.nextUrl.searchParams.get("perPage") ?? 20;
  const search = request.nextUrl.searchParams.get("search");
  console.log(search);
  let submissions;

  try {
    // Get form
    const form = await prisma.form.findFirst({
      where: { id: formId },
      select: {
        name: true,
        _count: {
          select: {
            submissions: true, //{ where: { title: 'Hello!' } },
          },
        },
      },
    });

    // Get submission
    submissions =
      await prisma.$queryRaw`SELECT * FROM "Submission" WHERE form_id = ${formId} LIMIT ${Number(
        take
      )} OFFSET ${Number(skip)}`;

    // submissions = await prisma.submission.findMany({
    //   where: {
    //     form_id: formId,
    //     ...(search ? { fields: { string_contains: search } } : {}),
    //   },
    //   skip: Number(skip),
    //   take: Number(take),
    // });
    console.log("yayyyy", submissions);
    submissions = submissions.map((s) => ({
      ...s.fields,
      created_at: s["created_at"],
    }));

    const submissionKeys = uniq(submissions.flatMap(Object.keys));
    const pagination = {
      pageCount:
        form._count.submissions < take
          ? 1
          : Math.ceil(form._count.submissions / take),
      pageIndex: skip,
      pageSize: take,
    };

    return NextResponse.json({ submissions, submissionKeys, form, pagination });

    //
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err });
  }
}
