import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "Cors";

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1274620",
  key: "4a4a8022810f89fae4c9",
  secret: "7924ccf6c7a540d4d568",
  cluster: "eu",
  useTLS: true,
});

app.use(express.json());
app.use(cors());

const connection_url =
  "mongodb+srv://Jackoo:B8B8IbD8VMZqHn7G@cluster0.vp6vz.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  // useCreateIndex: true,
  usenewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A Change Occured -->", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Our App listening on localhost -> http://localhost:${port}`);
});
