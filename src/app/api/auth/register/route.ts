import { hash } from "bcrypt";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import { prisma } from "@/base/prisma";

export async function POST(req: NextApiRequest) {
  const { email, password } = await req.body.json();

  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" });
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json(user);
  }
}
