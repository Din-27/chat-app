const { default: axios } = require("axios");

const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const API = axios.create({
  baseURL: 'http://localhost:3004/'
})

const start = (socket) => {
  const { roomId, identity } = socket.handshake.query;
  console.log(`Client ${identity} connected`);
  API.get('/client_aktif')
    .then(({ data }) => {
      if (data.filter(x => x.identity === identity).length === 0)
        API.post('/client_aktif', { identity: identity, room_id: roomId }).then()
    })
  // Join a conversation
  socket.join(roomId);

  socket.on("disconnect", () => {
    console.log(`Client ${identity} diconnected`);
    API.get('/client_aktif')
      .then(({ data }) => {
        const getId = data.filter(x => x.identity === identity)[0]
        API.delete(`/client_aktif/${getId.id}`)
      }).catch(e => console.log(e))
    socket.leave(roomId);
  });

  socket.on(NEW_CHAT_MESSAGE_EVENT, async (data) => {
    API.get('/client_aktif')
      .then((res) => {
        const checkBot = res.data.filter(x => x.identity === 'chatbot')
        // console.log(res.data.filter(x => x.identity === 'chatbot'),
        //   !identity.includes('chatbot') && res.data.filter(x => x.identity === 'chatbot').length > 0);
        if (!identity.includes('chatbot') && checkBot.length > 0 && checkBot[0].room_id === roomId) {
          if (data.body.match(/[o|O][R|r][d|D][e|E][r|R]/gm)) {
            setTimeout(() => {
              API.post('/pesan', { identity: 'chatbot', body: 'pesan apa kak?' })
                .then(() => {
                  io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, { identity: 'chatbot', body: 'pesan apa kak?' });
                })
                .catch((e) => console.log(e))
            }, 2000)
          }
        }
        API.post('/pesan', data)
          .then(() => {
            io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
          })
          .catch((e) => console.log(e))
      });
  })
}

io.on("connection", (socket) => start(socket));

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
