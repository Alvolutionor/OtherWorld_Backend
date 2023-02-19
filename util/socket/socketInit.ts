import { Server,Socket } from 'socket.io';
import {Application} from "express"
import https from "https";
import http from "http";

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
    const server = (process.env.ENV_LOCAL == "false")?https.createServer(app):http.createServer(app)

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
      console.log("listening")

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
        socket.broadcast.emit("NewUser", logInData.name)
        socket.join(socketToRoom.roomId)
        console.log("a user joined room")
        console.log(socketToRoom)
        console.log(io.sockets.adapter.rooms)

      })
      socket.on("leaveRoom",(socketToRoom)=>{
        socket.leave(socketToRoom.roomId)
      })
      socket.on("sendMsg",({who,what}:{who:string, what:string})=>{
        who=who?who:"Anonymous"
        socket.broadcast.emit("UserMessage", {who,what})
        console.log( who + " says:" + what)
          
      })
      socket.on("__RTCOffer",(msg)=>{
        socket.broadcast.emit("__RTCOffer",msg)
        console.log("__RTCOffer")
        console.log(msg)

      })
      socket.on("__RTCCandidate",(msg)=>{
        console.log("__RTCCandidate")
        console.log(msg)
        socket.broadcast.emit("__RTCCandidate",msg)
      })
      socket.on("__RTCAnswer",(msg)=>{
        console.log("__RTCAnswer")
        console.log(msg)
        socket.broadcast.emit("__RTCAnswer",msg)
      })
      socket.on("__RC",(msg:{stage:string,payload:{name:string,password:string,device:string}})=>{
        if (msg.stage == 'login'){
          msg.payload
        }

      })

    })
  }

}