const express = require("express");
const socketio = require("socket.io");
const mongoose = require("mongoose");

// connect to MongoDB database
mongoose.connect("mongodb+srv://uttam_gupta:Qazwsx55@cluster0.et4nl6t.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create Message model
const Message = mongoose.model("Message", {
  text: String,
});

// set up express app
const app = express();
const server = require("http").createServer(app);

// set up socket.io
const io = socketio(server);

// listen for new socket connections
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // listen for new messages
  socket.on("newMessage", async (messageText) => {
    console.log(`New message: ${messageText}`);

    // save new message to database
    const message = new Message({ text: messageText });
    await message.save();

    // broadcast the new message to all connected clients
    io.emit("newMessage", messageText);
  });
});

// serve the client-side HTML and JS on root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// start the server on port 3000
server.listen(3000, () => {
  console.log("Server started on port 3000");
})
