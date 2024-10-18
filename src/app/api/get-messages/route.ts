import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

//upon opening old chat then retrieving the chat

export const POST = async (req: Request) => {
  const { chatId } = await req.json();
  const _messages = await db
    .select()
    .from(messages)
    .where(eq(messages.chatId, chatId));

  return NextResponse.json(_messages);
};
