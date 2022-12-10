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
  socket.on("chat message", async (msg: { userName: string; comment: string }) => {
    if (msg.userName === "") {
      msg.userName = "No Name"
    }
    redis.xadd('chaut', '*', msg.userName, msg.comment)
    const respons = await redis.xread('COUNT', 100, 'STREAMS', 'chaut', 0)
    io.emit("chat message", msg)
  })

  socket.on("init",async () => {
    const response = await redis.xread('STREAMS', 'chaut', 0)
    const [key, message] = response !== null ? response[0]: [undefined, []];
    const msgs = message.map(m => ({'userName': m[1][0], 'comment': m[1][1]}))
    console.log('msgs', msgs)
    console.log('key', key)
    io.emit("init", msgs)
  })
})

http.listen(port, () => console.log(`Example app listening on port ${port}!!!`))
