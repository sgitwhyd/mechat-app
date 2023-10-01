import axiosInstance from "@/libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSendChat = () => {
  return useMutation({
    mutationFn: async ({ text, roomId }: { text: string; roomId: string }) => {
      const response = await axiosInstance.post("/chat", {
        text,
        room_id: roomId,
      });
      return response.data;
    },
  });
};

export const useGetAllChat = (roomId: string) => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(`/chat/${roomId}`);
      return response.data;
    },
    queryKey: ["get_chats"],
  });
};
