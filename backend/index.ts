import express from "express";
import type { Request, Response } from "express";
import { tavily } from "@tavily/core";
import { z } from "zod";
import OpenAI from "openai";
import dotenv from "dotenv";
import { PROMPT_TEMPLATE, SYSTEM_PROMPT } from "./prompt";
import { prisma } from "./db";
import middleware from "./utils/middleware";
import cors from "cors";

dotenv.config();

if (!process.env.PORT || !process.env.OPEN_ROUTER_API || !process.env.API_KEY) {
  throw new Error(" Missing environment variables");
}

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors(
  {
    origin: [
      "http://localhost:5173",
      "https://your-app.vercel.app",
    ],
    credentials: true,
  }
));

const clientTavily = tavily({ apiKey: process.env.API_KEY });
const clientOpenRouter = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API,
  baseURL: "https://openrouter.ai/api/v1",
});

const userInputQuery = z.object({
  query: z.string().min(2).max(200, {message: "under 200 words"}),
});

function formatContext(results: any[]) {
  return results
    .slice(0, 5) 
    .map((r) => ({
      title: r.title,
      content: r.content?.slice(0, 500), 
      url: r.url,
    }));
}


  

app.post("/ask-Athena", middleware,  async (req: Request, res: Response) => {
  try {
    const convo = userInputQuery.safeParse(req.body);

    if (!convo.success) {
      return res.status(400).json({
        message: "Invalid input",
        error: convo.error.format(),
      });
    }

    const query = convo.data.query;

    let web_results: any = [];
    try {
      const response = await clientTavily.search(query, {
        searchDepth: "advanced",
      });

      web_results = formatContext(response.results || []);
    } catch (err) {
      console.error("Tavily error:", err);
    }

    const prompt = PROMPT_TEMPLATE
      .replace("{{CONTEXT}}", JSON.stringify(web_results, null, 2))
      .replace("{{USER_QUERY}}", query);

    const llmResponse = await clientOpenRouter.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      temperature: 0.3, 
      max_tokens: 800,
      messages: [
        {
          role: "system",
          content:
            SYSTEM_PROMPT +
            "\n\nSTRICT RULE: Output MUST be valid XML. No markdown, no extra text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let finalOutput = llmResponse.choices[0]?.message?.content || "";

    finalOutput = finalOutput.trim();

    if (!finalOutput.includes("<ANSWER>")) {
      finalOutput = `
<ANSWER>
The model failed to generate a structured response. Please try rephrasing your query.
</ANSWER>
<FOLLOW_UPS>
  <QUESTION>Can you provide more specific details?</QUESTION>
  <QUESTION>What exact information are you looking for?</QUESTION>
  <QUESTION>Can you simplify your query?</QUESTION>
</FOLLOW_UPS>
      `.trim();
    }
    res.json({
      data: finalOutput,
      context_used: web_results.length,
    });

  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

const followOnSchema = z.object({
  query: z.string().min(1),
  conversationId: z.string(),
});

app.post("/ask-Athena/follow-on", middleware, async (req, res) => {
  try {

    const parsed = followOnSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }
    const { query, conversationId } = parsed.data;

    const supabaseId = req.userId;

    if (!supabaseId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const currentUser = await prisma.users.findFirst({
      where: {
        superbaseId: supabaseId,
      },
    });

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId: currentUser.id,
      },

      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    const history = conversation.messages.map((msg) => ({
      role: msg.role === "User" ? "user" : "assistant",
      content: msg.content,
    }));

    history.push({
      role: "user",
      content: query,
    });

    const llmResponse = await clientOpenRouter.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",

      temperature: 0.3,

      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
      ],
    });

    const answer =
      llmResponse.choices[0]?.message?.content ||
      "No response generated.";

    await prisma.messages.create({
      data: {
        content: query,
        role: "User",
        conversationId: conversation.id,
      },
    });

    await prisma.messages.create({
      data: {
        content: answer,
        role: "Assistant",
        conversationId: conversation.id,
      },
    });

    return res.status(200).json({
      answer,
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(port, () => {
  console.log(` Athena is live at http://localhost:${port}`);
});