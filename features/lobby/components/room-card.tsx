import React from "react";
import Image from "next/image";
import { useContext } from "react";
import { useRouter } from "next/router";

import socket from "@/config/socket/socket";
import { AuthContext } from "@/store/context/AuthContext";
import { IRoom } from "@/types/auth-store";

type RoomCardProps = {
  room: IRoom;
};

export const RoomCard = ({ room }: RoomCardProps) => {
  const { code, name, _id } = room;
  const Router = useRouter();
  const {
    state: { user },
  } = useContext(AuthContext);

  const handleJoinRoom = () => {
    Router.push(`/chats/${_id}`);
    socket.emit("join", {
      user_id: user?.user_id,
      room_id: _id,
    });
  };

  return (
    <div className="bg-brand-gray-400 rounded-[10px] h-fit flex items-center relative">
      <Image
        src="/assets/icons/room.svg"
        alt="room illustration"
        width={250}
        height={250}
        priority
      />
      <div className="flex flex-col gap-5">
        <h1 className="text-brand-xl leading-brand-xl">{name}</h1>
        <p className="text-base leading-4">
          Code <br /> {code}
        </p>
        <button
          className="bg-brand-blue-500 rounded-full text-base leading-4 py-2 px-[22px] max-w-[80px] text-white"
          onClick={handleJoinRoom}
        >
          Join
        </button>
      </div>
    </div>
  );
};
