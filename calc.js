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

function roll() {
	rollFactions();
	drawFactions();
	rollPlayers();
	drawPlayers();
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
		return;
	}
}

function drawFactions() {
	const area = document.getElementById("selectedFactions");
	area.style.gridTemplateColumns = "repeat(" + arraySelected.length +", 1fr)";
	area.innerHTML = "";

	for(let cursor = 0; cursor < arraySelected.length; cursor++) {
		let card = document.createElement('article');
		card.classList.add(arraySelected[cursor].factionShortname);
		card.style.setProperty("--i", cursor);
		let cardImage = document.createElement('img');
		cardImage.src = "assets/factions/" + arraySelected[cursor].factionShortname + "/leader.png";
		card.appendChild(cardImage);
		let cardTitle = document.createElement('h4');
		cardTitle.textContent = arraySelected[cursor].factionName;
		card.appendChild(cardTitle);
		area.appendChild(card);
	}
}

function rollPlayers() {
	for(let len = arraySelected.length - 1; len > 0; len--) {
		const ind = Math.floor(Math.random() * (len + 1));
		[arraySelected[len], arraySelected[ind]] = [arraySelected[ind], arraySelected[len]];
	}
}

function drawPlayers() {
	const area = document.getElementById("assignedPlayers");
	area.style.gridTemplateColumns = "repeat(" + arraySelected.length +", 1fr)";
	area.innerHTML = "";
	let playerNumber = 0;

	for(let cursor = 0; cursor < arraySelected.length; cursor++) {
		playerNumber++
		let animationDelay = arraySelected.length + playerNumber;
		let player = document.createElement('article');
		player.classList.add(arraySelected[cursor].factionShortname);
		player.style.setProperty("--i", animationDelay);
		let playerLegend = document.createElement('h4');
		playerLegend.textContent = "Player " + playerNumber;
		player.appendChild(playerLegend);
		let playerMeeple = document.createElement('img');
		playerMeeple.src = "assets/factions/" + arraySelected[cursor].factionShortname + "/meeple.png";
		player.appendChild(playerMeeple);
		area.appendChild(player);
	}

}
