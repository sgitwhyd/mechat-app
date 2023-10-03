"use client";

import { useState, useEffect } from "react";
import { IRoom } from "@/types/auth-store";
import { RoomCard } from "@/features/lobby/components";
import pusher from "@/libs/pusher";
import { useListRoom } from "@/services/room.service";
import Loading from "@/components/loading";

type ListRoomProps = {
  searchQuery: string;
};

export const ListRoom = ({ searchQuery }: ListRoomProps) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const filteredRooms = () => {
    if (searchQuery) {
      return rooms.filter((room) =>
        room.name.toLowerCase().includes(searchQuery)
      );
    } else {
      return rooms;
    }
  };

  useEffect(() => {
    const channel = pusher.subscribe("rooms");
    channel.bind("new_room", (room: IRoom) => {
      setRooms([...rooms, room]);
    });

    return () => pusher.unsubscribe("rooms");
  }, [rooms]);

  const { data, isLoading } = useListRoom();

  useEffect(() => {
    if (!isLoading && data) {
      setRooms(data);
    }
  }, [data, isLoading]);

  return (
    <div className="space-y-5">
      {isLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-300px)]">
          <Loading />
        </div>
      ) : filteredRooms().length === 0 ? (
        <div className="text-center text-2xl">{searchQuery} not found</div>
      ) : (
        filteredRooms().map((room, index) => (
          <RoomCard key={index} room={room} />
        ))
      )}
    </div>
  );
};
