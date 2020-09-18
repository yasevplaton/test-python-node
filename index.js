const express = require("express");
const { spawn } = require("child_process");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  var dataToSend;

  // create child process for python script
  const python = spawn("python", ["test.py", "node", "python"]);

  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });

  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.send(dataToSend);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
