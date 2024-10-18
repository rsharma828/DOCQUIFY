import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import React from "react";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import ChatComponent from "@/components/ChatComponent";
import { checkSubscription } from "@/lib/subscription";

type Props = {
  params: {
    chatId: string;
  };
};

//chatpage in which pdf , sidebar and chatbox is placed

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();
  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* Chat sidebar */}
        <div className="flex-[1] max-w-xs">
          {" "}
          <ChatSideBar chatId={parseInt(chatId)} chats={_chats} isPro={isPro} />
        </div>
        {/* pdf renderer / viewer  */}
        <div className="max-h-screen p-4 overflow-scroll flex-[5]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        {/* chat component  */}
        <div className="flex-[3] border-1-4 border-1-slate-200">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
