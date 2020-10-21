const express = require("express");
const { spawn } = require("child_process");
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {

  // store some constants
  const pythonScript = "intersect.py";
  const environmentPath = "./intersect-module-env/bin/python3.9";
  const pathToInputLayer = "./data/vydels.json";
  const pathToMask = "./data/geoCategories.json";

  // define en empty string to store output data
  let dataToSend = "";

  // define arguments for a python process
  args = [
    `${pythonScript}`,
    pathToInputLayer,
    pathToMask
  ];

  // create child process for a python script
  const pythonProcess = spawn(environmentPath, args, {shell: true});

  pythonProcess.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend += data.toString();
  });

  pythonProcess.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.json(JSON.parse(dataToSend));
  });

  pythonProcess.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
