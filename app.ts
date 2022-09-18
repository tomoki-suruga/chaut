const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const http = require("http").Server(app)
const io = require("socket.io")(http)
const moment = require('moment');
const Redis = require('ioredis');
const redis_address = process.env.REDIS_ADDRESS || 'redis://chaut-cluster.galiun.ng.0001.apne1.cache.amazonaws.com';
const redis = new Redis(redis_address);

app.get("/", (req: any, res: any) => {
  res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket: any) => {
  socket.on("chat message", (msg: { userName: string; comment: string }) => {
    if (msg.userName === "") {
      msg.userName = "No Name"
    }
    const result = redis.get('hoge')
    console.log('redis_result: ',result);
    io.emit("chat message", msg)
  })
})

http.listen(port, () => console.log(`Example app listening on port ${port}!`))
