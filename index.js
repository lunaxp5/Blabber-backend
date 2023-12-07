require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const useChatRouter = require("./routes/chat");
const useUserRoute = require("./routes/user");

const app = express();

const whitelist = [
  process.env.FRONTEND_URI,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("conectado a BD");
  })
  .catch((err) => {
    console.log("fallo conexion BD");
  });

app.use(express.json());
app.use("/chat", useChatRouter);
app.use("/user", useUserRoute);

app.listen(PORT, () => {
  console.log("running");
});
