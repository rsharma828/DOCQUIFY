"use client";
import { DrizzleChat } from "@/lib/db/schema";
import { MessageCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { SubscriptionButton } from "./SubscriptionButton";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  return (
    <div className="w-full h-screen pt-2 pr-4 pl-4 pb-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <h3 className="flex justify-center text-slate-400 text-xl mb-3 font-bold">
          DocQuify
        </h3>
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>
      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <>
            <Link href={`/chat/${chat.id}`} key={chat.id}>
              <div
                className={cn(
                  "rounded-lg p-3 text-slate-300 flex items-center",
                  chat.id === chatId ? "bg-blue-600 text-white" : "",
                  chat.id !== chatId ? "hover:text-white" : ""
                )}
              >
                <MessageCircle className="mr-2" />
                <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                  {chat.pdfName}
                </p>
              </div>
            </Link>
          </>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 ">
        <div className="flex items-center gap-2 text-md text-slate-200 flex-wrap justify-between pr-4 pl-4">
          <Link href="/">Home</Link>
          <Link href="/">Source</Link>
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default ChatSideBar;
