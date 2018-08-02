import io from 'socket.io-client';

export const subscribeToMessages = (room, cb) => {

  const socket = io('http://localhost:8000/');

  socket.emit('subscribe', room);

  socket.on('new_message', message => {
    cb(null, message)
  });

  socket.on('load_initial_messages', messages => {
    console.log(messages);
  });

}

export const sendMessage = (room, message) => {
  socket.emit('send_message', {
    room,
    message
  });
}