var metronomeTrack = null;
var meter = null;
var counter = 0;

var audio = new Audio('cowbell_unstressed.ogg');
var audioStress = new Audio('cowbell.ogg');

function togglePlay() {
    console.log("Playing");
    var button = document.getElementById("playButton");
    meter = getMeter();
    if (metronomeTrack == null) { // Start playing
	button.innerHTML = "Stop";
	counter = 0;
	metronomeTrack = setInterval(function() {
	    if (meter != "none" && counter == 0) {
		audioStress.play();
	    } else {
		audio.play();
	    }
	    counter = (counter+1) % meter;
	    console.log(counter);
	}, 60000/getTempo());
    } else { // Stop playing
	button.innerHTML = "Start";
	clearInterval(metronomeTrack);
	metronomeTrack = null;
    }
}

function getTempo() {
    return parseInt(document.getElementById("tempoSlider").value);
}
function setTempo(value) {
    var input = document.getElementById("tempoSlider");
    input.value = value;
    onSliderChange(value);
}

function onSliderChange(value) {
    document.getElementById("tempoLabel").innerHTML=value;
    // Restart playing to adapt to tempo
    if (metronomeTrack != null) {
	togglePlay(); togglePlay();
    }
}

function setMeter(value) {
    if (value == meter) {
	return;
    }
    meter = value;
    // Restart playing to adapt to meter
    if (metronomeTrack != null) {
	togglePlay(); togglePlay();
    }
}

function getMeter() {
    return document.getElementById("meterSelect").value;
}

function increaseTempo(by) {
    setTempo(getTempo() + by);
}

function handleKey(e) {
    var evtobj = window.event ? event : e; //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
    RIGHT_ARROW = 39;
    LEFT_ARROW= 37;
    SPACE = 32;
    switch (evtobj.keyCode) {
    case RIGHT_ARROW:
	increaseTempo(1);
	break;
    case LEFT_ARROW:
	increaseTempo(-1);
	break;
    case SPACE:
	togglePlay();
	break;
    default:
	break;
    }
}
