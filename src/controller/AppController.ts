import { Request, Response } from 'express';
import BlockChain from "../estructure/blockChain";
import BlockChainStatus from "../views/BlockChainStatus";

export class AppController {

	static chain: BlockChain<string>;
	static difficulty: number = 1;

	public init(req: Request, res: Response): void {

		let t1 = Date.now();

		AppController.difficulty = req.body.difficulty;
		let data = req.body.data;
		AppController.chain = new BlockChain<string>(data, AppController.difficulty);
		let t2 = Date.now();

		res.send(new BlockChainStatus("BlockChain criada com sucesso", t2 - t1));
	}

	public restart(req: Request, res: Response): void {
		let t1 = Date.now()
		AppController.chain = null;
		let t2 = Date.now()

		res.send(new BlockChainStatus("A blockchain foi reiniciada", t2 - t1))
	}

	public getAllBlocks(req: Request, res: Response): void {

		if (AppController.chain) res.send(AppController.chain.getBlocks());

		else res.send([]);
	}

	public addBlock(req: Request, res: Response): void {

		let data = req.body.data;

		let t1 = Date.now();
		AppController.chain.addBlock(data, AppController.difficulty);
		let t2 = Date.now();

		res.send(new BlockChainStatus("Bloco adicionado com sucesso", t2 - t1));
	}

	public editChain(req: Request, res: Response): void {

		let hash = req.params.hash;
		let data = req.body.data;
		let chain2 = AppController.chain;

		let t1 = Date.now();
		AppController.chain.editBlock(hash, data);
		let t2 = Date.now();

		res.send(new BlockChainStatus("Um bloco foi atualizado e alterou toda a blockchain", t2 - t1))
	}
}

export default new AppController();
