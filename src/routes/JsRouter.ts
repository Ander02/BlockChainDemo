import { Router } from "express";
import * as path from "path";

export class JsRouter {

	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	public routes() {

		this.router.get("/app", (req, res) => {
			res.sendFile(path.join(__dirname + '/../../views/js/app.js'));
		});

		this.router.get("/lib/angular", (req, res) => {
			res.sendFile(path.join(__dirname + '/../../views/js/lib/angular.min.js'));
		});

		this.router.get("/lib/toastr", (req, res) => {
			res.sendFile(path.join(__dirname + '/../../views/js/lib/angular-toastr.tpls.js'));
		});

		this.router.get("/lib/socketIO", (req, res) => {
			res.sendFile(path.join(__dirname + '/../../views/js/lib/socket.io.js'));
		});
	}
}

export default new JsRouter();