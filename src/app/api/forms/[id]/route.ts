import { createEdgeRouter } from "next-connect";
import { prisma } from "@/base/prisma";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions, getSession } from "@/base/authOptions";

interface RequestContext {
  user?: {
    id: string;
    name: string;
    username?: string;
    email: string;
    image?: string;
  };
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

// Get all forms

router
  .get("/api/forms", async (req, ctx) => {
    // console.log(req, ctx);
    const forms = await prisma.form.findMany({
      where: { user_id: ctx.user?.id },
    });

    return NextResponse.json({ forms });
  })

  // Get form
  .get("/api/forms/:id", async (req, ctx) => {
    console.log("getFormReq", { req });
    const formId = req.params.id;

    const form = await prisma.form.findFirst({
      where: {
        id: formId,
        user_id: ctx.user?.id,
      },
    });

    return NextResponse.json(form);
  })

  // Create form
  .post("/api/forms", async (req, ctx) => {
    const formData = await req.json();
    console.log("posting", { req, user: ctx.user, formData });

    const form = await prisma.form.create({
      data: { ...formData, user_id: ctx.user?.id },
    });

    return NextResponse.json({ form });
  })

  // Update form
  .post("/api/forms/:id", async (req, ctx) => {
    const formId = req.params.id;
    const formData = req.body.data;

    const form = await prisma.form.update({
      where: {
        id: formId,
        user_id: ctx.user?.id,
      },
      data: { ...formData },
    });

    return NextResponse.json({ form });
  })

  // Delete form
  .delete("/api/forms/:id", async (req, ctx) => {
    const formId = req.params.id;
    console.log("hiloooo", req.params.id);
    const form = await prisma.form.delete({
      where: {
        id: formId,
        user_id: ctx.user?.id,
      },
    });

    return NextResponse.json(form);
  });

export async function GET(request: NextRequest, ctx: RequestContext) {
  const session = await getSession();
  if (session) {
    ctx.user = session.user;
  }
  console.log("GET");

  return router.run(request, ctx);
}

export async function POST(request: NextRequest, ctx: RequestContext) {
  const session = await getSession();
  if (session) {
    ctx.user = session.user;
  }
  console.log("POST");

  return router.run(request, ctx);
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  const session = await getSession();
  if (session) {
    ctx.user = session.user;
  }
  const formId = ctx.params.id;
  const form = await prisma.form.delete({
    where: {
      id: formId,
    },
  });
  console.log("DELETE");

  return NextResponse.json({ success: "Form deleted successfully" });
}
