import express from "express";
import type { Request, Response } from "express";
import { tavily } from "@tavily/core";
import { z } from "zod";
import OpenAI from "openai";
import cors from "cors";
import middleware from "./utils/middleware.js";
import { PROMPT_TEMPLATE, SYSTEM_PROMPT } from "./prompt.js";
import { prisma } from "./db/index.js";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});


console.log("ENV DEBUG RAW:", {
  OPEN_ROUTER_API: process.env.OPEN_ROUTER_API ? "YES" : "NO",
  API_KEY: process.env.API_KEY ? "YES" : "NO",
  DATABASE_URL: process.env.DATABASE_URL ? "YES" : "NO",
});

if (!process.env.OPEN_ROUTER_API || !process.env.API_KEY) {
  throw new Error("Missing environment variables");
}

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://athena-ai-neon.vercel.app",
      "https://athena-ai-git-main-diviks-projects-0f94f873.vercel.app",
      "athena-ai-git-main-diviks-projects-0f94f873.vercel.app"
    ],
    credentials: true,
  })
);

const clientTavily = tavily({
  apiKey: process.env.API_KEY as string,
});

const clientOpenRouter = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API as string,
  baseURL: "https://openrouter.ai/api/v1",
});


const userInputQuery = z.object({
  query: z.string().min(2).max(200),
})

function formatContext(results: any[]) {
  return results.slice(0, 5).map((r) => ({
    title: r.title,
    content: r.content?.slice(0, 500),
    url: r.url,
  }));
}



app.post("/ask-Athena", middleware, async (req: Request, res: Response) => {
  try {
    const parsed = userInputQuery.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const query = parsed.data.query;

    let web_results: any[] = [];

    try {
      const response = await clientTavily.search(query, {
        searchDepth: "advanced",
      });

      web_results = formatContext(response.results || []);
    } catch (err) {
      console.error("Tavily error:", err);
    }

    const prompt = PROMPT_TEMPLATE.replace(
      "{{CONTEXT}}",
      JSON.stringify(web_results, null, 2)
    ).replace("{{USER_QUERY}}", query);

    const llmResponse = await clientOpenRouter.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      temperature: 0.3,
      max_tokens: 800,
      messages: [
        {
          role: "system",
          content:
            SYSTEM_PROMPT +
            "\n\nSTRICT RULE: Output MUST be valid XML.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const finalOutput =
      llmResponse.choices[0]?.message?.content?.trim() || "";

    return res.json({
      data: finalOutput,
      context_used: web_results.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

async function startServer() {
  try {
    await prisma.$connect();

    app.listen(port, () => {
      console.log(`Athena is live on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();