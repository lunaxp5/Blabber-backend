require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const useChatRouter = require("./routes/chat");
const useUserRoute = require("./routes/user");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    optionsSuccessStatus: 200,
  })
);

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
