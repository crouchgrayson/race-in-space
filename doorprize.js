addEventListener("DOMContentLoaded", start);
// Global array of the selected contestants
var selectedC = [];

function start() {
    document.getElementById("contestantsBtn")
        .addEventListener("click", testInputBtn);
}

function testInputBtn() {
    var names = document.getElementById("names").value;

    if (names === "" || !isNaN(names)) {
        alert("Please enter at least 4 names to begin the race");
    }
    else
        namesBtn(names);
}

function namesBtn(names) {
    // Stores input into array
    var input = names.split("\n");

    var nameIndex = 0;
    var enteredNames = [];
    for (var i = 0; i < input.length; i++) {
        if (input[i] != "") {
            enteredNames[nameIndex] = input[i];
            nameIndex++;
        }
    }

    if (enteredNames.length < 4) {
        alert("Please enter at least 4 names to begin the race");
    }
    else {
        selectContestants(enteredNames);
    }
}

function selectContestants(namesArray) {
    document.getElementById("namesPage").style.display = "none";
    document.getElementById("contestantsPage").style.display = "block";

    var limit = getContestantsLimit(namesArray);
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

    if (selectedC.indexOf(name) > -1) {
        return true;
    }

    return false;
}

function showContestants() {
    var contestant = document.getElementsByTagName("li");
    for (var i = 0; i < selectedC.length; i++) {
        contestant[i].style.display = "block";
        contestant[i].innerHTML += selectedC[i];
    }
}

function raceBtn() {
    document.getElementById("contestantsPage").style.display = "none";
    document.getElementById("racePage").style.display = "block";

    var audio = new Audio("countdown.mp3");
    audio.play();

    var racePageDiv = document.getElementById("racePage");
    var racer;
    for (i = 1; i <= selectedC.length; i++) {
        racer = `<div id="position${i}"><i id="racer${i}" name="racer" class="fas fa-space-shuttle"></div>`;
        racePageDiv.innerHTML += racer;
    }

    setTimeout(setRaceInterval, 5850)
}


function setRaceInterval() {
    timerId = setInterval(function () {
        moveRacer(timerId)
    }, 1);
}

function moveRacer(timerId) {
    for (var i = 1; i <= selectedC.length; i++) {
        var racer = document.getElementById(`position${i}`);
        var left = parseInt(racer.offsetLeft);

        if (left + racer.offsetWidth > document.body.clientWidth) {
            clearInterval(timerId);
            setTimeout(getWinner, 3000);
        }
        var increment = Math.floor(Math.random() * 2);

        racer.style.left = left + increment + 'px';
    }
}

function getWinner() {
    for (var i = 1; i <= selectedC.length; i++) {
        var racer = document.getElementById(`position${i}`);
        var left = parseInt(racer.offsetLeft);

        if (left + racer.offsetWidth > document.body.clientWidth) {
            displayWinner(i);
        }
    }
}

function displayWinner(winnerPos) {
    var audio = new Audio("cheering.mp3");
    audio.play();

    document.getElementById("racePage").style.display = "none";
    var winnerPage = document.getElementById("winnerPage"); 
    winnerPage.style.display = "block";
    winnerPage.backgroundImage = "none";

    var winnerDiv = document.getElementById("winner");
    winnerDiv.innerHTML += `<i id="racer${winnerPos}" name="racer" class="fas fa-space-shuttle">`;

    document.getElementById("newRaceBtn")
    .addEventListener("click", newRace);
}

function cancelBtn() {
    document.getElementById("contestantsPage").style.display = "none";
    document.getElementById("namesPage").style.display = "block";
}

function newRace() {
    document.getElementById("winnerPage").style.display = "none";
    document.getElementById("names").value = "";
    document.getElementById("namesPage").style.display = "block";
    selectedC = [];
}