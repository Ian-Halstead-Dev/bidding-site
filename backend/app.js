const express = require("express");
const path = require("path");

const userRouter = require("./routers/user.router.js");

const app = express();

const connectToDb = require("./db/mongoose.js");

let dbError = connectToDb();

if (dbError === "error") {
  console.log("DB ERROR");
}

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../frontend/build")));
app.use("/users", userRouter);

app.get("/test", (req, res) => {
  res.send({ test: "test" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
