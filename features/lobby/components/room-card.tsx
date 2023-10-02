import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { IRoom } from "@/types/auth-store";
import { putToLocalStorage } from "@/utils";
import { authAction } from "@/store/actions/AuthActions";
import { useAuthContext } from "@/store/context/AuthContext";

type RoomCardProps = {
  room: IRoom;
};

export const RoomCard = ({ room }: RoomCardProps) => {
  const { name: room_name, user_id } = room;
  const { name: user_name } = user_id;
  const Router = useRouter();

  const { dispatch } = useAuthContext();

  const handleJoinRoom = () => {
    Router.push(`/chats`);
    putToLocalStorage("room", JSON.stringify(room));
    dispatch({
      type: authAction.JOIN_ROOM,
      payload: room,
    });
  };

  return (
    <div className="bg-brand-gray-400 rounded-[10px] h-fit flex flex-col sm:flex-row items-center relative p-4">
      <div className="relative w-48 h-48 md:w-[250px] md:h-[250px]">
        <Image
          src="/assets/icons/room.svg"
          alt="room illustration"
          sizes="100vh"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-brand-xl leading-brand-xl">{room_name}</h1>
        <p>Created By: {user_name}</p>
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
