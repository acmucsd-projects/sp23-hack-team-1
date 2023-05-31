import { io } from "socket.io-client";

export const socket = io("https://codenames-acm.herokuapp.com/");
