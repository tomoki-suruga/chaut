const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const http = require("http").Server(app)
const io = require("socket.io")(http)

app.get("/", (req: any, res: any) => {
  res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket: any) => {
  socket.on("chat message", (msg: any) => {
    io.emit("chat message", msg)
  })
})

http.listen(port, () => console.log(`Example app listening on port ${port}!`))
