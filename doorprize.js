addEventListener("DOMContentLoaded", start);
// Global array of the selected contestants
var selectedC = [];

function start() {
    document.getElementById("contestantsBtn")
        .addEventListener("click", testInput);
}

function testInput(names) {
    var names = document.getElementById("names").value;

    // Test if anything was entered
    if (names === "") {
        alert("Please enter at least 4 names to begin the race");
        return 0;
    }

    // Filters entered names based on new lines
    var input = names.split("\n");

    // Filters entered names based on blank lines
    var enteredNames = filterNames(input);

    if (enteredNames.length < 4) {
        alert("Please enter more than 4 names to begin the race");
    }
    else if (enteredNames.length > 1000) {
        alert("Please enter less than a 1,000 names to begin the race");
    }
    else {
        selectContestants(enteredNames);
    }
}

function filterNames(input) {
    var names = [];
    var nameIndex = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i] != "") {
            names[nameIndex] = input[i];
            nameIndex++;
        }
    }

    return names;
}

function selectContestants(namesArray) {
    // Hides the Names Page
    document.getElementById("namesPage").style.display = "none";
    // Displays the Contestants Page
    document.getElementById("contestantsPage").style.display = "block";

    // Gets a limit on the number of contestants
    var limit = getContestantsLimit(namesArray);

    // Adds randomly chosen names into selectedC
    while (selectedC.length < limit) {
        var random = Math.floor(Math.random() * namesArray.length);
        var possibleC = namesArray[random];

        if (!contestantAlreadySelected(possibleC)) {
            selectedC.push(possibleC);
        }
    }

    showContestants();

    document.getElementById("raceBtn")
        .addEventListener("click", raceBtn);

    document.getElementById("cancelBtn")
        .addEventListener("click", cancelBtn);
}

function getContestantsLimit(names) {
    var limit;

    if (names.length === 4) {
        limit = 4;
    }
    else if (names.length === 5) {
        limit = 5;
    }
    else {
        limit = 6;
    }

    return limit;
}

function contestantAlreadySelected(name) {
    // This statement checks to see if the name
    // was already selected 
    if (selectedC.indexOf(name) > -1) {
        return true;
    }

    return false;
}

function showContestants() {
    // Displays a spacecraft and assigns a contestant
    var contestantPageUl = document.getElementById("racers");
    var racer;
    for (var i = 0; i < selectedC.length; i++) {
        racer = `<li><i id="racer${i + 1}" class="fas fa-space-shuttle"></i>${selectedC[i]}</li>`;
        contestantPageUl.innerHTML += racer;
    }
}

function raceBtn() {
    // Hides the Contestants Page
    document.getElementById("contestantsPage").style.display = "none";

    // Clears contestants from Contestants Page
    document.getElementById("racers").innerHTML = "";

    // Displays Race Page
    document.getElementById("racePage").style.display = "block";

    var audio = new Audio("countdown.mp3");
    audio.play();

    // Displays corresonding spacecrafts
    var racePageDiv = document.getElementById("racePage");
    var racer;
    for (i = 1; i <= selectedC.length; i++) {
        racer = `<div id="position${i}"><i id="racer${i}" name="racer" class="fas fa-space-shuttle"></div>`;
        racePageDiv.innerHTML += racer;
    }

    setTimeout(setRaceInterval, 5800)
}

function setRaceInterval() {
    // Calls moverRacer every millisecond
    timerId = setInterval(function () {
        moveRacer(timerId)
    }, 10);
}

function moveRacer(timerId) {
    // Moves each racer by a random amount
    for (var i = 1; i <= selectedC.length; i++) {
        var racer = document.getElementById(`position${i}`);
        var left = parseInt(racer.offsetLeft);

        // Checks to see if racer has reached the end of the window
        if (left + racer.offsetWidth > document.body.clientWidth) {
            clearInterval(timerId);
            setTimeout(getWinner, 3000);
        }
        
        var increment = Math.floor(Math.random() * 5);

        racer.style.left = left + increment + 'px';
    }
}

function getWinner() {
    var found = false;

    // This loop checks for the winner
    for (var i = 1; i <= selectedC.length && !found; i++) {
        var racer = document.getElementById(`position${i}`);
        var left = parseInt(racer.offsetLeft);

        if (left + racer.offsetWidth > document.body.clientWidth) {
            var winner = i;
            found = true;
        }
    }

    displayWinner(winner);
}

function displayWinner(winnerPos) {
    // Hides the Race Page and clears the racers
    var racePageDiv = document.getElementById("racePage");
    racePageDiv.style.display = "none";
    racePageDiv.innerHTML = "";

    // Displays Winner Page
    var winnerPage = document.getElementById("winnerPage");
    winnerPage.style.display = "block";

    var audio = new Audio("cheering.mp3");
    audio.play();

    // Displays the winner 
    var winnerDiv = document.getElementById("winner");
    winnerDiv.innerHTML += `<h3 id="winner">${selectedC[winnerPos - 1]} is the Winner!!</h3>`
    winnerDiv.innerHTML += `<i id="racer${winnerPos}" name="racer" class="fas fa-space-shuttle">`;

    document.getElementById("newRaceBtn")
        .addEventListener("click", newRace);
}

function cancelBtn() {
    // Hides Contestant Page
    document.getElementById("contestantsPage").style.display = "none";

    // Displays Names Page
    document.getElementById("namesPage").style.display = "block";

    // Clears contestants from Contestants Page
    document.getElementById("racers").innerHTML = "";

    // Clears the previous contestants
    selectedC = [];

    document.getElementById("contestantsBtn")
        .addEventListener("click", testInput);
}

function newRace() {
    // Hides the Winner Page 
    document.getElementById("winnerPage").style.display = "none";

    // Clears the winner
    document.getElementById("winner").innerHTML = "";

    // Clears the names in the Names Page text box
    var namePageDiv = document.getElementById("names").value = "";

    // Displays Names Page
    document.getElementById("namesPage").style.display = "block";

    // Clears the previous contestants
    selectedC = [];
}