import React from "react";
import Image from "next/image";
import { IRoom } from "@/types/auth-store";

interface IRoomCardProps {
  room: IRoom;
  handleJoin: () => void;
}

const RoomCard = ({ room, handleJoin }: IRoomCardProps) => {
  const { code, name } = room;
  return (
    <div className="bg-brand-gray-400 rounded-[10px] h-fit flex items-center relative">
      <Image
        src="/assets/icons/room.png"
        alt="room illustration"
        width={200}
        height={200}
      />
      <div className="flex flex-col gap-5">
        <h1 className="text-brand-xl leading-brand-xl">{name}</h1>
        <p className="text-base leading-4">
          Code <br /> {code}
        </p>
        <button
          className="bg-brand-blue-500 rounded-full text-base leading-4 py-[6px] max-w-[80px] text-white"
          onClick={handleJoin}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
