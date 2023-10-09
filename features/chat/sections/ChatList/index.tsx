/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";

import pusher from "@/libs/pusher";
import { IChat } from "@/types/chat";
import { ChatBox } from "@/features/chat/components";
import useAllChatQuery from "@/features/chat/hooks/useAllChatQuery";
import { useAuthContext } from "@/store/context/AuthContext";
import Loading from "@/components/loading";

export const ChatList = () => {
  const { state } = useAuthContext();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<IChat[]>([]);

  const { isLoading } = useAllChatQuery(state.room?._id as string, setChats);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chats?.length]);

  useEffect(() => {
    if (state.room?._id) {
      const channel = pusher.subscribe(state.room._id as string);
      channel.bind("new_message", (chat: IChat) => {
        setChats([...chats, chat]);
      });
    }

    return () => pusher.unsubscribe(state.room?._id as string);
  }, [chats]);

  return (
    <div className=" pb-28 space-y-5 overflow-y-auto" ref={bottomRef}>
      {isLoading ? (
        <div className="flex  justify-center h-[calc(100vh-250px)] items-center">
          <Loading />
        </div>
      ) : chats.length === 0 ? (
        <div className="text-center text-xl mt-5 items-center flex justify-center">
          Nothing Chat here... Be first chat in here
        </div>
      ) : (
        chats.map((chat) => (
          <ChatBox
            key={chat._id}
            chat={chat}
            isSender={chat.user_id._id === state.user?.user_id}
          />
        ))
      )}
    </div>
  );
};
