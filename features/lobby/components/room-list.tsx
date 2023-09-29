"use client";

import { useState, useEffect } from "react";

import socket from "@/config/socket/socket";
import { IRoom } from "@/types/auth-store";
import { RoomCard } from "@/features/lobby";

type ListRoomProps = {
  searchQuery: string;
};

export const ListRoom = ({ searchQuery }: ListRoomProps) => {
  const [isLoading, setIsLoading] = useState(true);
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
    socket.on("room", (room: IRoom) => {
      setRooms([...rooms, room]);
    });
  }, [rooms]);

  useEffect(() => {
    socket.emit("get-room-data");
    socket.on("room-data", (rooms: IRoom[]) => {
      setRooms(rooms);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="space-y-5">
      {isLoading ? (
        <div>Loading</div>
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
