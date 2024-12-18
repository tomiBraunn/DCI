const socket = io("http://localhost:3000");

function send(type, data, callback = () => { }) {
  socket.emit("realTimeEvent", type, data, callback);
};

function receive(type, callback) {
  socket.on("realTimeEvent", (receivedType, data) => {
    if (receivedType === type) return callback(data);
  });
};

function fetchData(type, callback) {
  socket.emit("GETEvent", type, callback);
};

function postData(type, data, callback = () => { }) {
  socket.emit("POSTEvent", type, data, callback);
};
