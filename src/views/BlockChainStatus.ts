export default class BlockChainStatus{

	msg : string;
	time : number;

	constructor(msg : string, time : number) {
		this.msg = msg;
		this.time = time;
	}
}