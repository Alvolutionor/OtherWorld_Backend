import { Server,Socket } from 'socket.io';
import http from "http";
import {Application} from "express"

export interface socketLoginMessage{
  type:string// logged in or annouymous
  userId?:string
  password?:string
  name:string // check by server? 
}
export interface socketToRoom{
  type:string
  roomId:string
}

export default class Server_socket{

  constructor(app:Application){
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
    }); 
    server.listen(37788)
    io.on("connection", (socket:Socket)=>{
      let logInData: socketLoginMessage
      socket.emit("Connected")
      socket.on("login",(socketLoginMessage: socketLoginMessage)=>{
        //check data
        console.log("a user logged in")
        console.log(socketLoginMessage)

        io.emit("loginSucceed")
        logInData = socketLoginMessage
        //io.emit("loginFailed")
      })
      socket.on("toRoom",(socketToRoom: socketToRoom)=>{
        io.to(socketToRoom.roomId).emit("NewUser",logInData.name);

        socket.join(socketToRoom.roomId)
        console.log("a user joined room")
        console.log(socketToRoom)
        console.log(io.sockets.adapter.rooms)

      })
      socket.on("leaveRoom",(socketToRoom)=>{
        socket.leave(socketToRoom.roomId)
      })
      socket.on("sendMsg",({who,what,roomId}:{who:string, what:string, roomId:string})=>{
        io.to(roomId).emit("UserMessage",{who,what});
        console.log( logInData.name + "says" + roomId)
          
      })
    })
  }

}