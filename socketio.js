module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('send', (msg) => {
      io.broadcast.emit('receive', msg);
    });
  });
};
