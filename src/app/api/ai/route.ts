export const runtime = "edge";

import { OpenAI } from "openai";
import { streamText, StreamingTextResponse } from "ai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const result = await streamText({
    model: openai.chat.completions.create,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });
  return new StreamingTextResponse(result.toAIStream());
}