import { Router } from "express";
import * as path from "path";
import AppController from "../controller/AppController";

export class ApiRouter {

	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	public routes() {

		this.router.post("/init", AppController.init);
		this.router.post("/restart", AppController.restart);
		this.router.get("/blocks", AppController.getAllBlocks)
		this.router.post("/blocks", AppController.addBlock);
		this.router.put("/blocks/:hash", AppController.editChain);
	}

}

export default new ApiRouter();