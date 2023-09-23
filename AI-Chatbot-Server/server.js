const http = require("http");
const dotenv = require("dotenv");
const cluster = require("cluster");
const os = require("os");

dotenv.config({ path: "./config.env" });

const { app, PORT } = require("./app");

function startCluster() {
  const numWorkers = os.cpus().length;
  console.log(`Starting ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
}

console.log("Running server.js...");
if (cluster.isMaster) {
  console.log("Master has been started...");
  startCluster();
} else {
  console.log("Worker process started.");
  const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
  });
}
