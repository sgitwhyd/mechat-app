/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import { SetStateAction } from "react";

type SearchRoomProps = {
  setSearchQuery: SetStateAction<string | any>;
  setIsAddRoom: SetStateAction<string | any>;
};

export const SearchRoom = ({
  setIsAddRoom,
  setSearchQuery,
}: SearchRoomProps) => {
  return (
    <div className="sticky top-14 z-10 pb-1 bg-white  pt-[31px]">
      <div className="relative flex items-center w-full  py-[18px] bg-brand-gray-400 rounded-[10px] mb-3">
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
      <button
        className="font-bold text-brand-xl leading-brand-xl bg-brand-blue-500 rounded-md p-2 text-white mb-3"
        onClick={() => setIsAddRoom(true)}
      >
        + room
      </button>
    </div>
  );
};
