const express = require("express");

const hostname = "127.0.0.1";
const port = 3000;
const app = express();

app.use(express.json);

const testRouter = require("./routers/test");

app.use("/test", testRouter);

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ success: false, error: error.message, status: error.status });
});

app.listen(port, hostname, () => {
  console.log("server is running on port " + port);
});
