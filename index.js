import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connect } from "./connect.js";
import bot from "./bot.js";
const app = express();

app.use(express.json());
// cookie parser
app.use(cookieParser());
// for all the logs
app.use(morgan("dev"));
app.use(cors());

bot();
// console.log(unread, "unread");
app.get("/", (req, res) => {
  console.log(req.protocol + "://" + req.get("host") + req.originalUrl, "url");
  return res.status(200).json({ msg: "API health is Good" });
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

let port = process.env.Port || 5000;

//listening port number
app.listen(port, () => console.log("server running on " + port));
