const ChatMessage = require("../Models/ChatMessage");

function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join chat with PIN and userType
    socket.on("joinChat", async ({ userType, pin }) => {
      try {
        if (userType === "customer") {
          socket.join(pin);
          console.log(`Customer joined PIN room: ${pin}`);

          const messages = await ChatMessage.find({ pin }).sort({ createdAt: 1 });
          socket.emit("chatHistory", messages.map(m => ({
            sender: m.sender,
            text: m.message,
            pin: m.pin,
            seen: m.seen
          })));
        }

        if (userType === "admin") {
          socket.join("admin");
          console.log("Admin joined admin room");
        }
      } catch (err) {
        console.error(err);
      }
    });

    // Send message
    socket.on("sendMessage", async ({ sender, text, pin }) => {
      if (!pin) return;

      try {
        const newMessage = new ChatMessage({ sender, message: text, pin, seen: false });
        await newMessage.save();

        // Send to customer and admin
        io.to(pin).emit("receiveMessage", { sender, text, pin, seen: false });
        io.to("admin").emit("receiveMessage", { sender, text, pin, seen: false });
      } catch (err) {
        console.error(err);
      }
    });

    // Mark messages seen
    socket.on("markSeen", async ({ pin }) => {
      if (!pin) return;
      try {
        await ChatMessage.updateMany(
          { sender: "customer", pin, seen: false },
          { $set: { seen: true } }
        );

        io.to(pin).emit("messagesSeen", { pin });
        io.to("admin").emit("messagesSeen", { pin });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("disconnect", () => console.log("User disconnected:", socket.id));
  });
}

module.exports = initSocket;
