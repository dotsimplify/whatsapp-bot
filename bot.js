import { connect } from "./connect.js";
import { makeInMemoryStore } from "@adiwajshing/baileys";

const store = makeInMemoryStore({});

// // can be read from a file
// store.readFromFile("./chat.json");
// // saves the state to a file every 10s
// setInterval(() => {
//   store.writeToFile("./chat.json");
// }, 10_000);

export default async () => {
  const socket = await connect();

  socket.ev.on("messages.upsert", async (message) => {
    console.log(JSON.stringify(message, undefined, 2), "messages");

    console.log("replying to", message.messages[0].key.remoteJid);
    console.log("complete message", message.messages[0].message.conversation);
  });
  // socket.ev.on("chats.set", (dt) => {
  //   console.log(dt, "chat");
  //   // can use "store.chats" however you want, even after the socket dies out
  //   // "chats" => a KeyedDB instance
  //   console.log("got chats", store.chats.all());
  // });
};
