import * as express from "express"
import * as path from "path";
import * as bodyParser from "body-parser";
import * as socketIO from "socket.io";
import * as http from "http";

import Block from "./estructure/block";
import BlockChain from "./estructure/blockChain";
import BlockChainStatus from "./views/BlockChainStatus"

const app = express();
app.use(bodyParser.json())

const server = http.createServer(app);
const io = socketIO(server);

let difficulty = 1;
var chain: BlockChain<string>;

io.on('connection', (socket) => {

	console.log("Client Connected in the socket");

	socket.on('update', (data) => {
		socket.emit('chainUpdate', data);
		socket.broadcast.emit('chainUpdate', data);
	});
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/index.html'));
})

app.get("/js/angular", (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/js/angular.min.js'));
});

app.get("/js/toastr", (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/js/angular-toastr.tpls.js'));
});

app.get("/js/socketIO", (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/js/socket.io.js'));
});


app.get("/css/bootstrap", (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/css/bootstrap.css'));
});

app.get("/css/toastr", (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/css/angular-toastr.css'));
});

app.post("/api/init", (req, res) => {

	let t1 = Date.now();

	difficulty = req.body.difficulty;
	let data = req.body.data;
	chain = new BlockChain<string>(data, difficulty);

	let t2 = Date.now();

	res.send(new BlockChainStatus("BlockChain criada com sucesso", t2 - t1));
});

app.post("/api/restart", (req, res) => {
	let t1 = Date.now()
	chain = null;
	let t2 = Date.now()
	res.send(new BlockChainStatus("A blockchain foi reiniciada", t2 - t1))
});

app.get("/api/blocks", (req, res) => {

	if (chain) res.send(chain.getBlocks());

	else res.send([]);
})

app.post("/api/blocks", (req, res) => {

	let data = req.body.data;
	let t1 = Date.now();

	chain.addBlock(data, difficulty);

	let t2 = Date.now();

	res.send(new BlockChainStatus("Bloco adicionado com sucesso", t2 - t1));
});

app.put("/api/blocks/:hash", (req, res) => {

	let hash = req.params.hash;
	let data = req.body.data;
	let chain2 = chain;
	let t1 = Date.now();
	chain.editBlock(hash, data);
	let t2 = Date.now();
	res.send(new BlockChainStatus("Um bloco foi atualizado e alterou toda a blockchain", t2 - t1))
});

server.listen(3000, () => { });  