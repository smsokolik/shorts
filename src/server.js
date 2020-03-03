const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const ipMiddleware = require("./server/middleware/logging.middleware");
const userRoutes = require("./server/routes/user.routes");

app.use(ipMiddleware);
app.use(bodyParser.json());
app.use(express.static(__dirname + "/dist/shorts"));

app.use("/api/users", "userRoutes")

app.get("/", (req, res)=> res.sendFiles("/dist/shorts/index.html"))

app.get("*", (req, res)=> 
    res.sendFile('/dist/shorts/index.html', {root: __dirname + "/"}));

app.listen(port, ()=> console.log('Listening on port: ${port}'))

