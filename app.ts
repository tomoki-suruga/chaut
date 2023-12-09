import type {Redis, Result} from 'ioredis';
const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const http = require("http").Server(app)
const io = require("socket.io")(http)
const IoRedis = require('ioredis');
const redis_address = process.env.REDIS_ADDRESS || 'redis://chaut-cluster.galiun.ng.0001.apne1.cache.amazonaws.com';
// const redis:Redis = new IoRedis(redis_address);
/** for local */
const redis:Redis = new IoRedis('chaut_cache_1:6379');

app.get("/", (req: any, res: any) => {
  res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket: any) => {
  socket.on("addMessage", async (msg: { userName: string; comment: string }) => {
    if (msg.userName === "") {
      msg.userName = "No Name"
    }
    const result = await redis.xadd('chaut', '*', msg.userName, msg.comment)
    io.emit("returnLatestNumber", result)
  })

  socket.on("readMessages", async (massageId: string) => {
    const response = await redis.xread('STREAMS', 'chaut', massageId)
    const [_, message] = response !== null ? response[0]: [undefined, []];
    const msgs = message.map(m => ({'userName': m[1][0], 'comment': m[1][1]}))
    io.emit("returnMessages", msgs)
  })
})

http.listen(port, () => console.log(`brows localhost:80`))
