import * as express from "express"
import * as path from "path";
import * as bodyParser from "body-parser";
import * as socketIO from "socket.io";
import * as http from "http";

import JsRouter from "./routes/JsRouter";
import CssRouter from "./routes/CssRouter";
import ApiRouter from "./routes/ApiRouter";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json())

app.use("/js", JsRouter.router);
app.use("/css", CssRouter.router);
app.use("/api", ApiRouter.router);

io.on('connection', (socket) => {

	console.log("Client Connected in the socket");

	socket.on('update', (data) => {
		socket.emit('chainUpdate', data);
		socket.broadcast.emit('chainUpdate', data);
	});
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/index.html'));
});

server.listen(3000, () => { });