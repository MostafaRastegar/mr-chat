const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://172.30.106.165:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  socket.on("message", (message, room) => {
    console.log("Recieved from API ::", { message, room });
    if (room?.length) {
      io.to(room).emit("message", message);
    } else {
      // broadcast
      io.emit("message", message);
    }
  });
  socket.on("joinRoom", (room) => {
    console.log("joinRoom :>> ", room);
    socket.join(room);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
