import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
} from "@adiwajshing/baileys";

// import { Boom } from "@hapi/boom";
export const connect = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("whatsapp-cred");
  const socket = makeWASocket.default({
    printQRInTerminal: true,
    auth: state,
  });
  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.logout;
      if (shouldReconnect) {
        await connect();
      }
    }
  });

  socket.ev.on("creds.update", saveCreds);
  return socket;
};
