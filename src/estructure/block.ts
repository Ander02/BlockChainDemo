import * as crypto from "crypto";

export default class Block<T> {
	blockHeigth: number;
	timestamp: number;
	difficulty: number;
	nonce: number = 0;
	data: T;
	hash: string;
	previousBlock: Block<T>;

	constructor(data: T, previousBlock: Block<T> = null, difficulty: number = 1) {
		this.data = data;
		this.difficulty = difficulty;
		this.timestamp = Date.now();
		this.previousBlock = previousBlock;
		this.blockHeigth = previousBlock ? previousBlock.blockHeigth + 1 : 0;
		
		this.mine();
	}

	private generateSha256() {
		//return crypto.createHmac("sha256", this.toString()).digest("hex");
		return crypto.createHmac("sha256", this.toStringWithoutHash()).digest("hex");
	}

	public mine() {
		this.nonce = 0;
		this.hash = this.generateSha256();
		while (this.hash.search("^(0){" + this.difficulty + "}") != 0) {
			this.nonce++;
			this.hash = this.generateSha256();
			console.log(this.toStringWithoutHash());
		}
	}

	public toString() {
		return JSON.stringify({
			blockHeigth: this.blockHeigth,
			timestamp: this.timestamp,
			difficulty: this.difficulty,
			data: this.data,
			nonce: this.nonce,
			hash: this.hash,
			previousHash: this.previousBlock ? this.previousBlock.hash : "0000000000000000000000000000000000000000000000000000000000000000"
		})
	}

	public toStringWithoutHash() {
		return JSON.stringify({
			blockHeigth: this.blockHeigth,
			timestamp: this.timestamp,
			difficulty: this.difficulty,
			data: this.data,
			nonce: this.nonce,
			previousHash: this.previousBlock ? this.previousBlock.hash : "0000000000000000000000000000000000000000000000000000000000000000"
		});
	}

	public printBlock() {
		console.log(this.toString())
	}

	public equals(block: Block<T>) {
		// this.blockHeigth === block.blockHeigth;
		// this.data === block.data;
		// this.difficulty === block.difficulty;
		// this.hash === block.hash;
		// this.nonce === block.nonce;
		// this.previousBlock === block.previousBlock;
		// this.timestamp=== block.timestamp;
		return this.toString() === block.toString();
	}
}