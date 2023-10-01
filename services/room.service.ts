/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/libs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getChatsFromRoom = async (id: string) => {
  try {
    const request = await axiosInstance.get(`/chat/${id}`);
    const response = await request.data;
    const chats = response.results;
    return {
      error: false,
      message: response.message,
      data: chats,
    };
  } catch (error: any) {
    const { data } = error.response;
    return {
      error: true,
      message: data.message,
    };
  }
};

export const useStoreRoom = () => {
  return useMutation({
    mutationFn: async (name: string) => {
      const response = await axiosInstance.post("/room", {
        name,
      });
      return response.data.result;
    },
  });
};

export const useListRoom = () => {
  return useQuery({
    queryKey: ["get_rooms"],
    queryFn: async () => {
      const response = await axiosInstance.get("/room");
      return response.data.data;
    },
  });
};
