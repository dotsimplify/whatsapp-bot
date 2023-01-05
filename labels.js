const Baileys = require("baileys");

const client = new Baileys(
  "<Your WhatsApp Business Account SID>",
  "<Your WhatsApp Business Auth Token>"
);

// Set a label
client.labels.create("<Label Name>").then((label) => {
  console.log(`Label created with ID: ${label.sid}`);
});

// Get a label
client.labels.list().then((labels) => {
  console.log(`Your labels: ${labels}`);
});
