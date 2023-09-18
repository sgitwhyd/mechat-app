import { io } from "socket.io-client";

const socketUrl = process.env.NEXT_APP_SOCKET_URL as string;

const socket = io(socketUrl);

export default socket;
