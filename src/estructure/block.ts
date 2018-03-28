import * as crypto from "crypto";

export default class Block<T> {
	blockHeigth: number;
	timestamp: number;
	difficulty: number;
	nonce: number;
	data: T;
	hash: string;
	previousBlock: Block<T>;

	constructor(data: T, previousBlock: Block<T> = null ,difficulty: number = 1) {
		this.data = data;
		this.timestamp = Date.now();
		this.difficulty = difficulty;
		this.nonce = 0;
		this.previousBlock = previousBlock;

		this.mine();
	}

	private generateSha256() {
		console.log(this);
		return crypto.createHmac("sha256","blockchain").digest("hex");
	}

	private mine() {
		this.hash = this.generateSha256();

		while (!this.hash.match("^(0){" + this.difficulty + "}")) {
			this.nonce++;
			this.hash = this.generateSha256();
		}
	}

	public toString(){
		return JSON.stringify({
			blockHeigth: this.blockHeigth,
			timestamp : this.timestamp,
			difficulty : this.difficulty,
			data : this.data,
			nonce : this.nonce,
			hash : this.hash,
			previousHash : this.previousBlock.hash
		})
	}

	public printBlock(){
		console.log(this.toString())
	}
}