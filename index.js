require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const useChatRouter = require("./routes/chat");
const useUserRoute = require("./routes/user");

const app = express();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("conectado a BD");
  })
  .catch((err) => {
    console.log("fallo");
  });

app.use(express.json());
app.use("/chat", useChatRouter);
app.use("/user", useUserRoute);

app.get("/", (_req, res) => {
  res.send("hola ");
});

app.listen(PORT, () => {
  console.log("running");
});
