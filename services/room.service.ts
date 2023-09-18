/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/utils/api";

export const getRoomDetail = async (id: string) => {
  try {
    const request = await api.get(`/room/${id}`);
    const response = await request.data;

    return {
      error: false,
      message: response.message,
      data: response,
    };
  } catch (error: any) {
    const { data } = error.response;
    return {
      error: true,
      message: data.message,
    };
  }
};
