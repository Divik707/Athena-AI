import type { NextFunction } from "express";
import { createClient } from '@supabase/supabase-js'
import type { Request, Response} from "express";
import { prisma } from "../db";

const superbase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_PUBLISHABLE_KEY!);

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export default async function middleware(req: Request, res:Response, next:NextFunction) {
    const header = req.headers.authorization;
    const token = header?.split(' ')[1];
    if(!token) {
        res.json({
            message: "Auth token didn't passed"
        })
    }
    else {
        const data = await superbase.auth.getUser(token);
        const userId = data.data.user?.id;
        if(userId) {
            try {
                await prisma.users.create({
                    data: {
                        email: data.data.user?.email!,
                        provider: data.data.user?.app_metadata.provider === "google" ? "Google" : "Github",
                        username: data.data.user?.user_metadata.user_name,
                        superbaseId: data.data.user?.id!
                    }
                })
            } catch(e) {
                console.error(e);
            }
            req.userId = userId;
            next();
        }
        else {
            res.json({
                message: "Authentication failed wrong token passed"
            })
        }
    }
}