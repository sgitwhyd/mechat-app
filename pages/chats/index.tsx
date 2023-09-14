"use client";

import React, { useState } from "react";
import Layout from "@/components/layout";
import Image from "next/image";
import { useRouter } from "next/router";

const Chats = () => {
  const router = useRouter();
  const user_id = 1;
  const [chats, setChats] = useState<{}[]>([]);
  const [chat, setChat] = useState<string>("");

  const onChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setChat(e.target.value);
  };

  const handleSendMessage = () => {
    const newChat = {
      user_id: 1,
      message: chat,
    };

    setChats([...chats, newChat]);
    setChat("");
  };

  return (
    <Layout
      withTopBar
      title="Room Name"
      customClass="fixed top-0 bg-white z-10"
      icon={
        <button onClick={() => router.back()}>
          <Image
            src="/assets/icons/arrow-left.svg"
            alt="arrow left icon"
            width={12}
            height={12}
          />
        </button>
      }
    >
      <div className="flex-1 w-full relative px-[27px]">
        <div className=" pb-28 space-y-5 mt-20 overflow-y-auto">
          {chats.map((chat, index) => (
            <div key={index} className="">
              <p
                className={`${
                  chat.user_id === user_id ? "text-end" : ""
                } mb-2 text-xs font-semibold`}
              >
                Sigit
              </p>
              <div
                className={`rounded-[10px] min-h-[45px] py-4 px-5 w-fit text-[14px] ${
                  chat.user_id === user_id
                    ? "bg-brand-blue-500 ml-auto text-white"
                    : "bg-brand-gray-400"
                }`}
              >
                {chat.message}
              </div>
              <div
                className={`${
                  chat.user_id === user_id ? "text-end" : ""
                } mb-2 text-[9px] font-semibold mt-2`}
              >
                {/* {new Date().toISOString()} */}
                testing
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full">
          <div className="flex justify-between py-5 pr-5 gap-3 bottom-0 bg-white fixed w-full max-w-lg">
            <div className="bg-brand-gray-400 rounded-[10px] py-[18px] pl-[18px] flex gap-5 w-full ">
              <div className="">
                <Image
                  src="/assets/icons/emot.svg"
                  alt="emot icon"
                  width={24}
                  height={24}
                />
              </div>
              <input
                type="text"
                value={chat}
                placeholder="Write Here.."
                className="bg-transparent w-full focus:outline-none"
                onChange={onChatInputChange}
              />
            </div>
            <div
              className="w-[100px] cursor-pointer"
              onClick={handleSendMessage}
            >
              <div className="w-[60px] h-[60px] bg-brand-blue-500 rounded-full flex items-center justify-center">
                <Image
                  src="/assets/icons/send-icons.svg"
                  alt="send icon"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chats;
