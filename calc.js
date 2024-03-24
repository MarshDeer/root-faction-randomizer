function fetchData() {
	fetch("https://raw.githubusercontent.com/MarshDeer/root-faction-randomizer/trunk/data.json")
		.then(response => response.json())
		.then(data => {
			arrayReach = data.viableReach;
			console.log(arrayReach);
			arrayExpansions = data.expansions;
			console.log(arrayExpansions);
		})
}
fetchData();

function initPool() { // TODO: There must be a less dumb way to do this
	arrayPool = [];
	arrayPool = JSON.parse(JSON.stringify(arrayExpansions.expansionBase));
	if (document.getElementById("expansionRiverfolk").checked) {
		arrayPool = arrayPool.concat(arrayExpansions.expansionRiverfolk);
	}
	if (document.getElementById("expansionUnderworld").checked) {
		arrayPool = arrayPool.concat(arrayExpansions.expansionUnderworld);
	}
	if (document.getElementById("expansionMarauder").checked) {
		arrayPool = arrayPool.concat(arrayExpansions.expansionMarauder);
	}
}

function rollFactions() {
	initPool();
	let playerCount = document.querySelector("input[type=radio][name=playerCount]:checked").value;
	let reachViable = arrayReach[playerCount - 2];
	let reachSum = 0;
	arraySelected = [];

	while (arraySelected.length < playerCount) {
		let rand = Math.floor(Math.random() * arrayPool.length);
		reachSum = reachSum + arrayPool[rand].factionReach;
		arraySelected.push(Object.assign({}, arrayPool[rand]));
		if (arrayPool[rand].factionName == "Vagabond" && arrayPool[rand].factionReach == 5) {
			arrayPool[rand].factionReach = 2;
		} else {
			arrayPool.splice(rand, 1);
		}
	}

	if (reachSum <= reachViable) {
		console.log('Reach too low; retrying...');
		rollFactions();
	} else {
		drawFactions();
		return;
	}
}

function drawFactions() {
	for(let ind = 0; ind < arraySelected.length - 1; ind++) {
		// TODO: Draw factions function
	}
}

function rollPlayers() {
	for(let len = arraySelected.length - 1; len > 0; len--) {
		const ind = Math.floor(Math.random() * (len + 1));
		[arraySelected[len], arraySelected[ind]] = [arraySelected[ind], arraySelected[len]];
	}
	drawPlayers();

	let n = 0;
	while (n < arraySelected.length) {
		console.log('Player ', n + 1, ': ', arraySelected[n].factionName)
		n++
	}
}

function drawPlayers() {
	for(let ind = 0; ind < arraySelected.length - 1; ind++) {
		// TODO: Draw players function
	}

}
