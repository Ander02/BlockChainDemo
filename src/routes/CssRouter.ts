import { Router } from "express";
import * as path from "path";

export class CssRouter {

	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	public routes() {


		this.router.get("/lib/bootstrap", (req, res) => {
			res.sendFile(path.join(__dirname + '/../../views/css/lib/bootstrap.css'));
		});

		this.router.get("/lib/toastr", (req, res) => {
			res.sendFile(path.join(__dirname + '/../../views/css/lib/angular-toastr.css'));
		});

		this.router.get("/style", (req, res) => {
			res.sendFile(path.join(__dirname + '/../../views/css/style.css'));
		});
	}
}

export default new CssRouter();