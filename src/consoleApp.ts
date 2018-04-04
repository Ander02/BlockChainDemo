import * as readline from 'readline-sync';
import Block from "./estructure/block";
import BlockChain from "./estructure/blockChain";

console.log("Bem Vindo ao BlockChain Structure");

var difficulty: number = -1;
do {
	let escolha = readline.question("Escolha uma dificuldade para sua blockchain entre 1 e 5: ");

	difficulty = Number(escolha) ? Number(escolha) : -1;

} while (difficulty <= 0 || difficulty > 5);

console.log("Digite o valor do bloco Gênesis");

var tInicio = Date.now();
var chain = new BlockChain<string>(readline.question("> "), difficulty);
var tFim = Date.now();

console.log("O bloco gênesis é: ");
chain.getGenesisBlock().printBlock();
console.log();
console.log("Esse bloco demorou " + (tFim - tInicio) + " ms para ser criado: ", );
console.log();

var opcao: number = 0;
do {
	console.log("Escolha dentre uma das opções abaixo");
	console.log("1 - Adicionar Bloco");
	console.log("2 - Ver último bloco");
	console.log("3 - Ver primeiro bloco");
	console.log("4 - Ver todos os blocos");
	console.log("5 - Ver dificuldade");
	console.log("9 - Limpar  console");
	console.log("0 - Sair");
	console.log(">");

	let escolha = readline.question("> ");

	opcao = Number(escolha) ? Number(escolha) : -1;

	switch (opcao) {
		case 1:
			console.log("Digite o valor do bloco");
			tInicio = Date.now();
			chain.addBlock(readline.question("> "), difficulty);
			tFim = Date.now();

			console.log();
			console.log("O bloco inserido foi: ");
			chain.getLastBlock().printBlock();
			console.log();
			console.log("Esse bloco demorou " + (tFim - tInicio) + " ms para ser criado: ", );
			console.log();

			break;
		case 2:
			console.log("O último bloco é: ");
			chain.getLastBlock().printBlock();
			console.log();
			break;
		case 3:
			console.log("O primeiro bloco é: ");
			chain.getGenesisBlock().printBlock();
			console.log();
			break;
		case 4:
			chain.printChain();
			console.log();
			break;
		case 5:
			console.log("A dificuldade dessa BlockChain é: " + difficulty);
			console.log();
			break;
		case 9:
			console.clear();
			break;
	}
} while (opcao > 0);
console.log("Byeeee");