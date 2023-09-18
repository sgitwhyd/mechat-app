"use client";

import React, { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Layout from "@/components/layout";
import { AuthContext } from "@/store/context/AuthContext";
import socket from "@/config/socket/socket";
import { messageProps, IRoom } from "@/types/chat";
import { getRoomDetail } from "@/services/room.service";

const Chats = () => {
  const router = useRouter();
  const { state } = useContext(AuthContext);
  const user_id = state.user?.user_id;
  const room_id = router.query.room_id;
  const bottomRef = useRef<HTMLDivElement>(null);

  const [room, setRoom] = useState<IRoom>();
  const [chats, setChats] = useState<messageProps[]>([]);
  const [chat, setChat] = useState<string>("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chats.length]);

  useEffect(() => {
    (async () => {
      if (room_id) {
        const { data } = await getRoomDetail(room_id as string);
        const room = data.data;

        setRoom(room);
      }
    })();

    if (room_id && state.user?.user_id) {
      socket.emit("leave-room", user_id);
      socket.emit("join", {
        user_id: state.user?.user_id,
        room_id: room_id,
      });
    }
  }, [room_id, state.user?.user_id]);

  useEffect(() => {
    socket.on("chat", (chat: messageProps) => {
      setChats([...chats, chat]);
    });
  }, [chats]);

  useEffect(() => {
    socket.emit("get-chats-history", { room_id: room_id });
    socket.on("get-chats", (chats: messageProps[]) => {
      setChats(chats);
    });
  }, [room_id]);

  const onChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setChat(e.target.value);
  };

  const handleSendMessage = () => {
    socket.emit("store-chat", {
      room_id: room_id as string,
      text: chat,
    });
    setChat("");
  };

  const handleBack = () => {
    socket.emit("leave-room");
    router.back();
  };

  return (
    <Layout
      withTopBar
      title={room?.name}
      customClass="fixed top-0 bg-white z-10"
      icon={
        <button onClick={handleBack}>
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
        <div className=" pb-28 space-y-5 mt-20 overflow-y-auto" ref={bottomRef}>
          {chats.map((chat, index) => (
            <div key={index} className="">
              <p
                className={`${
                  chat.user_id._id === user_id ? "text-end" : ""
                } mb-2 text-xs font-semibold`}
              >
                {chat.user_id.name}
              </p>
              <div
                className={`rounded-[10px] min-h-[45px] py-4 px-5 w-fit text-[14px] ${
                  chat.user_id._id === user_id
                    ? "bg-brand-blue-500 ml-auto text-white"
                    : "bg-brand-gray-400"
                }`}
              >
                {chat.text}
              </div>
              <div
                className={`${
                  chat.user_id._id === user_id ? "text-end" : ""
                } mb-2 text-[9px] font-semibold mt-2`}
              >
                {chat.createdAt}
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
