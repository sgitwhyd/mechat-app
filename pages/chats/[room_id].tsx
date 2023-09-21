"use client";

import React, { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Layout from "@/components/layout";
import { AuthContext } from "@/store/context/AuthContext";
import socket from "@/config/socket/socket";
import { messageProps, IRoom } from "@/types/chat";
import { getRoomDetail } from "@/services/room.service";
import ChatBox from "@/feature/chat/chat-box";
import SendMessage from "@/feature/chat/send-message";

const Chats = () => {
  const router = useRouter();
  const { state } = useContext(AuthContext);
  const user_id = state.user?.user_id;
  const room_id = router.query.room_id;
  const bottomRef = useRef<HTMLDivElement>(null);

  const [room, setRoom] = useState<IRoom>();
  const [chats, setChats] = useState<messageProps[]>([]);

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
          {chats.map((chat) => (
            <ChatBox
              key={chat._id}
              chat={chat}
              isSender={chat.user_id._id === user_id}
            />
          ))}
        </div>
        <div className="flex w-full">
          <SendMessage room_id={room_id as string} />
        </div>
      </div>
    </Layout>
  );
};

export default Chats;
