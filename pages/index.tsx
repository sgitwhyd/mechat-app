"use client";

import { NextPage } from "next";
import Head from "next/head";
import Layout from "@/components/layout";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "@/store/context/AuthContext";
import { useState, useEffect } from "react";
import socket from "@/config/socket/socket";
import { IRoom } from "@/types/auth-store";

const Index: NextPage = () => {
  const { state } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    <Layout
      withTopBar
      topBarElement={
        <div className="flex items-center w-full px-6">
          <div className="flex items-center gap-5">
            <Image
              src={`https://ui-avatars.com/api/?name=${state.user?.name}&background=random`}
              alt={`showing ${state.user?.name} avatar image`}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
            <p className="text-brand-xl leading-brand-xl">{state.user?.name}</p>
          </div>
        </div>
      }
    >
      <div className="flex-1 w-full px-[27px] mt-[31px]">
        <Head>
          <title>mechat-app</title>
          <meta name="description" content="Generated by Create Next Stack." />
        </Head>
        <div className="sticky top-5 z-10 bg-white pb-1">
          <div className="relative flex items-center w-full py-[18px] bg-brand-gray-400 rounded-[10px] mb-3">
            <Image
              src="/assets/icons/magnifier.svg"
              alt="magnifier icon"
              width={24}
              height={24}
              className="ml-6"
            />
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search Room..."
              className="bg-transparent focus:outline-none ml-5 text-xl leading-5 "
            />
          </div>
        </div>
        <div className="space-y-5">
          {isLoading ? (
            <div>Loading</div>
          ) : filteredRooms().length === 0 ? (
            <div className="text-center text-2xl">{searchQuery} not found</div>
          ) : (
            filteredRooms().map((room, index) => (
              <div
                key={index}
                className="bg-brand-gray-400 rounded-[10px] h-fit flex items-center relative"
              >
                <Image
                  src="/assets/icons/room.png"
                  alt="room illustration"
                  width={200}
                  height={200}
                />
                <div className="flex flex-col gap-5">
                  <h1 className="text-brand-xl leading-brand-xl">
                    {room.name}
                  </h1>
                  <p className="text-base leading-4">
                    Code <br /> {room._id}
                  </p>
                  <button
                    className="bg-brand-blue-500 rounded-full text-base leading-4 py-[6px] max-w-[80px] text-white"
                    onClick={() => {}}
                  >
                    Join
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
