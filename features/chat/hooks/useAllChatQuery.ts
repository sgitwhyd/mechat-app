/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IChat } from "@/types/chat";
import { getChatsFromRoom } from "@/services/room.service";

const useAllChatQuery = (roomId: string, callback: (chat: IChat[]) => void) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IChat[]>();

  useEffect(() => {
    (async () => {
      const response = await getChatsFromRoom(roomId);
      if (!response.error) {
        setData(response.data);
        setIsLoading(false);
        callback(response.data);
      }
    })();
  }, [roomId]);

  return {
    isLoading,
    data,
  };
};

export default useAllChatQuery;
