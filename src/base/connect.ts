import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import nc, { NextConnect } from "next-connect";

import { authOptions } from "./authOptions";
import { prisma } from "./prisma";

export const connect = (options: any = {}) => {
  let handler = nc({
    attachParams: true,
    onError: (err: any, req: any, res: any, next: any) => {
      console.error(err);
      res.status(err?.status || 500).json({
        message: err?.message || "Something broke",
        detail: err?.details || {},
      });
    },

    onNoMatch: (req: any, res: any) => {
      // res.status(404).end("Page is not found");
    },
  });

  if (options.withAuth) {
    handler = handler.use(async (req: any, res: any, next: any) => {
      req.session = await getServerSession(req, res, authOptions(req, res));

      if (req.session?.user?.id) {
        req.user = await prisma.user.findFirst({
          where: { id: req.session.user.id },
        });
      }

      next();
    });
  }

  return handler as NextConnect<
    NextApiRequest & { user?: User; session?: any; params: any },
    NextApiResponse
  >;
};
