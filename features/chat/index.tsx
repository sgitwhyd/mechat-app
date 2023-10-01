import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { useAuthContext } from "@/store/context/AuthContext";

import Layout from "@/components/layout";
import { ChatList } from "@/features/chat/sections/ChatList";
import { SendMessage } from "@/features/chat/components";
import { removeFromLocalStorage } from "@/utils";
import { authAction } from "@/store/actions/AuthActions";
import Seo from "@/components/seo";

const Chats = () => {
  const router = useRouter();
  const { state, dispatch } = useAuthContext();

  const handleBack = () => {
    router.back();
    removeFromLocalStorage("room");
    dispatch({
      type: authAction.LEAVE_ROOM,
    });
  };

  return (
    <Layout
      withTopBar
      title={
        <div className="fixed top-0 bg-white z-10 shadow-md h-[64px] w-full left-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="text-brand-xl leading-brand-xl text-brand-blue-500">
              {state.room?.name ? state.room?.name : "Loading"}
            </div>
          </div>
        </div>
      }
      icon={
        <div className="fixed z-20 top-3">
          <button
            onClick={handleBack}
            className="bg-brand-gray-400 py-3 px-4 rounded-full "
          >
            <Image
              src="/assets/icons/arrow-left.svg"
              alt="arrow left icon"
              width={12}
              height={12}
            />
          </button>
        </div>
      }
    >
      <Seo
        title={state.room?.name as string}
        description={`this page showing all chat in room ${state.room?.name} created by ${state.room?.user_id.name}`}
      />
      <div className="flex-1 w-full relative px-[27px]">
        <ChatList />
        <SendMessage />
      </div>
    </Layout>
  );
};

export default Chats;
