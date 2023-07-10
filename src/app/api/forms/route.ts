import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { prisma } from "@/base/prisma";
import { getSession } from "@/base/authOptions";

// Get all forms
export async function GET(request: NextRequest) {
  const session = await getSession();

  try {
    const forms = await prisma.form.findMany({
      where: { user_id: session.user?.id },
    });

    return NextResponse.json({ forms });
    //
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

// Create form
export async function POST(request: NextRequest) {
  const session = await getSession();
  const formData = await request.json();

  try {
    const form = await prisma.form.create({
      data: { ...formData, user_id: session.user?.id },
    });

    return NextResponse.json({ success: "Form created successfully", form });
    //
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
