const { default: axios } = require("axios");

const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";


let senderData = {};

io.on("connection", (socket) => {
  const { roomId, identity } = socket.handshake.query;
  console.log(`Client ${identity} connected`);

  // Join a conversation
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, async (data) => {

    if (!identity.includes('chatbot')) {
      if (data.body.match(/[o|O][R|r][d|D][e|E][r|R]/gm)) {
        setTimeout(() => {
          axios.post('http://localhost:3004/pesan', { identity: 'chatbot', body: 'pesan apa kak?' })
            .then((res) => {
              io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, { identity: 'chatbot', body: 'pesan apa kak?' });
            })
            .catch((e) => console.log(e))
        }, 2000)
      }
    }
    axios.post('http://localhost:3004/pesan', data)
      .then((res) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
      })
      .catch((e) => console.log(e))
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${identity} diconnected`);
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
