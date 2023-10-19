import { Server, type Socket } from "socket.io";

export default function SocketHandler(req: any, res: any) {
    // means that socket server was already initialised
    if (res.socket.server.io) {
      res.end();
      return;
    }
  
    const io = new Server(res.socket.server, {
      path: "/api/socket",
    });
    res.socket.server.io = io;
  
    const onConnection = (socket: Socket) => {
      socket.on("ping", () => console.log("pong"))
    };
  
    io.on("connection", onConnection);
  
    res.end();
  }