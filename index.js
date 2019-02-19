const express = require('express');
const helmet = require('helmet');

const zooController = require('./routeController');


const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/zoos", zooController);
// endpoints here

server.get('/', (req, res) => {
  res.send({Success: "sanity check acquired..."})
})



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
