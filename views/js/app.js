const app = angular.module("app", ['toastr']);

app.controller('BlockChain', ($scope, $http, toastr) => {

	const socket = io.connect('http://localhost:3000');

	socket.on('chainUpdate', (data) => {
		if (data) $scope.getAllBlocks();
	})

	$scope.blocks = [];
	$scope.getAllBlocks = () => $http.get("/api/blocks").then((success) => {
		$scope.blocks = [];

		success.data.forEach(block => {
			$scope.blocks.push(block);
		});

	}, (error) => {

	});

	$scope.initBlockChain = () => {
		$http.post("/api/init", $scope.genesis).then((success) => {

			$scope.getAllBlocks();

			$scope.genesis = undefined;

			toastr.info("Criada em " + success.data.time + "ms", success.data.msg);

			socket.emit('update', true);

		}, (error) => {

		})
	}

	$scope.newBlock = {};
	$scope.addBlock = () => {
		$http.post("/api/blocks", $scope.newBlock).then((success) => {

			$scope.getAllBlocks();
			$scope.newBlock.data = "";

			let content = document.getElementById("content");
			content.scrollTop = content.scrollHeight;

			toastr.success("Criado em " + success.data.time + "ms", success.data.msg);

			socket.emit('update', true);

		}, (error) = {

		});
	}

	$scope.editBlock = (hash, data) => {
		$http.put("/api/blocks/" + hash, { data: data }).then((success) => {

			$scope.getAllBlocks();
			toastr.error("Editado em " + success.data.time + "ms", success.data.msg);

			socket.emit('update', true);

		}, (error) => {

		});
	}

	$scope.restartChain = () => {
		$http.post("/api/restart", $scope.newBlock).then((success) => {

			$scope.getAllBlocks();

			toastr.warning("Reiniciada em " + success.data.time + "ms", success.data.msg);

			socket.emit('update', true);

		}, (error) = {

		});
	}

	window.onload = () => {
		console.log("Iniciando...");
		$scope.getAllBlocks();
		console.log("Iniciado!");
	}

});