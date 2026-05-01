import { streamText, UIMessage, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: openai("gpt-4.1-mini"),
      messages: await convertToModelMessages(messages),
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("Error straming chat completion", err);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
