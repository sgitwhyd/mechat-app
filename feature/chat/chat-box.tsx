import React from "react";
import { messageProps } from "@/types/chat";
import { formatDate } from "@/utils";

type ChatBoxProps = {
  chat: messageProps;
  isSender: boolean;
};

const ChatBox = ({ isSender, chat }: ChatBoxProps) => {
  return (
    <div>
      <p className={`${isSender ? "text-end" : ""} mb-2 text-xs font-semibold`}>
        {chat.user_id.name}
      </p>
      <div
        className={`rounded-[10px] min-h-[45px] py-4 px-5 w-fit text-[14px] ${
          isSender
            ? "bg-brand-blue-500 ml-auto text-white"
            : "bg-brand-gray-400"
        }`}
      >
        {chat.text}
      </div>
      <div
        className={`${
          isSender ? "text-end" : ""
        } mb-2 text-[9px] font-semibold mt-1`}
      >
        {formatDate(chat.createdAt)}
      </div>
    </div>
  );
};

export default ChatBox;
