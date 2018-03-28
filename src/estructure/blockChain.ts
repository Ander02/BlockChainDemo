import Block from "./block"

export default class BlockChain<T> {

	blocks : Block<T>[];

	constructor(data : T, difficult : number = 1) {
		this.blocks = [];
		this.addBlock(data, difficult);
	}

	public getGenesisBlock(){
		return this.blocks[0];
	}

	public getLastBlock(){
		if(this.blocks.length > 0) return this.blocks[this.blocks.length - 1];

		else if (this.blocks.length == 0) return this.blocks[this.blocks.length];

		else return null;
	}
	
	public addBlock(data : T, difficult : number){
		var last = this.getLastBlock();

		var newBlock = new Block<T>(data, last, difficult);
		
		newBlock.blockHeigth = last.blockHeigth ? last.blockHeigth + 1 : 0;

		this.blocks.push(newBlock);
	}

	public printChain(){
		this.blocks.forEach(block => {
			block.printBlock();
		});
	}
}