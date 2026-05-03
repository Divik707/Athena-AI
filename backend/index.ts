import express from "express";
import type { Request, Response } from "express";
import { tavily } from "@tavily/core";
import { z } from "zod";
import OpenAI from "openai";
import dotenv from "dotenv";
import { PROMPT_TEMPLATE, SYSTEM_PROMPT } from "./prompt";
import { prisma } from "./db";

dotenv.config();

if (!process.env.PORT || !process.env.OPEN_ROUTER_API || !process.env.API_KEY) {
  throw new Error(" Missing environment variables");
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const clientTavily = tavily({ apiKey: process.env.API_KEY });
const clientOpenRouter = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API,
  baseURL: "https://openrouter.ai/api/v1",
});

const userInputQuery = z.object({
  query: z.string().min(2).max(200),
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

app.post('/signup', async(req, res) => {
  
})

app.post('/signin', async(req, res) => {
  
})

app.get('/Athena/convresations', async(req, res) => {
  
})

app.post('/Athena/conversation/:id', async(req, res) => {
  
})

app.post("/ask-Athena", async (req: Request, res: Response) => {
  try {
    const convo = userInputQuery.safeParse(req.body);

    if (!convo.success) {
      return res.status(400).json({
        message: "Invalid input",
        error: convo.error.format(),
      });
    }

    const query = convo.data.query;
    // see if same query has been asked indexed db -> figure out

    // check the credit of the present user -> if not handle that route

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

app.post('/ask-Athena/follow-on', async(req, res) => {
  // get existing chat from db
  // forward the full history to llm
  // do context engenering
  // stream the response to user
})

app.listen(port, () => {
  console.log(` Athena is live at http://localhost:${port}`);
});