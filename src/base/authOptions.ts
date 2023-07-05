import { compare } from "bcrypt";
import { prisma } from "@/base/prisma";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { getServerSession, NextAuthOptions } from "next-auth";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        // TODO: Also save them to a subscribed list.
        // const result = await postmarkClient.sendEmailWithTemplate({
        //     TemplateId: 26938195,
        //     To: identifier,
        //     From: provider.from!,
        //     TemplateModel: {
        //         verification_url: url,
        //         product_name: "Picstape",
        //         company_name: "Panikka Studio",
        //         product_url: "https://picstape.com",
        //         company_address: "68 Circular Road, #02-01, 049422, Singapore",
        //     },
        // });
        // if (result.ErrorCode) {
        //     throw new Error(result.Message);
        // }
      },
    }),
  ],
  pages: {
    signIn: `/auth/login`,
    verifyRequest: `/auth/login`,
    error: "/auth/login", // Error code passed in query string as ?error=
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.user = user;
      return token;
    },
    session: async ({ session, token, user }) => {
      // @ts-expect-error
      session.user = { ...session.user, id: token.sub };
      return session;
    },
  },
};

export async function getSession() {
  return await getServerSession(authOptions as any)<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
    };
  } | null>;
}

export default NextAuth(authOptions);
