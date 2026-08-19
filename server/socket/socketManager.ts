

// map user id -> websocket

import { IncomingMessage } from "http";
import { WebSocket, WebSocketServer } from "ws";

const onlineUsers = new Map<string, WebSocket>()


//initialize socket Server

export function initSocketServer(server : any){
    const wss = new WebSocketServer({server, path:"/ws"})

    wss.on("connection", async(ws:WebSocket, req:IncomingMessage)=>{
        console.log("Client connected")

        //extract token from query string :  /ws?token
        const url =  new URL(req.url!, `http://${req.headers.host}`);
    })
    return wss;
}