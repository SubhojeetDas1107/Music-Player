var songs = ["The Weeknd - Blinding Lights.mp3", "The Weeknd - Hardest To Love.mp3", "Stereo Hearts.mp3", "Shiddat Title Track.mp3", "Shayad.mp3", "Khairiyat.mp3", "Haareya.mp3", "Ik Mulaqaat.mp3", "Nazm Nazm.mp3", "Mitti Di Khushboo.mp3", "Saadi Galli Aaja.mp3", "Pani Da Rang.mp3"];

var songTitle = document.getElementById('songTitle');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('volumeSlider');
var nextSongTitle = document.getElementById('nextSongTitle');

var song = new Audio();
var currentSong = 0;

window.onload = loadSong;

function loadSong () {
	song.src = "AudioPlayer-Music/" + songs[currentSong];
	songTitle.textContent = "Currently Playing: " + (currentSong + 1) + ". " + songs[currentSong];
	nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[currentSong + 1 % songs.length];
	song.playbackRate = 1;
	song.volume = volumeSlider.value;
	song.play();
	setTimeout(showDuration, 1000);
}

setInterval(updateSongSlider, 1000);

function updateSongSlider () {
	var c = Math.round(song.currentTime);
	songSlider.value = c;
	currentTime.textContent = convertTime(c);
	if(song.ended){
		next();
	}
}

function convertTime (secs) {
	var min = Math.floor(secs/60);
	var sec = secs % 60;
	min = (min < 10) ? "0" + min : min;
	sec = (sec < 10) ? "0" + sec : sec;
	return (min + ":" + sec);
}

function showDuration () {
	var d = Math.floor(song.duration);
	songSlider.setAttribute("max", d);
	duration.textContent = convertTime(d);
}

function playOrPauseSong (img) {
	song.playbackRate = 1;
	if(song.paused){
		song.play();
		img.src = "AudioPlayer-icons/pause.png";
	}else{
		song.pause();
		img.src = "AudioPlayer-icons/play.png";
	}
}

function next(){
	currentSong = currentSong + 1 % songs.length;
	loadSong();
}

function previous () {
	currentSong--;
	currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
	loadSong();
}

function seekSong () {
	song.currentTime = songSlider.value;
	currentTime.textContent = convertTime(song.currentTime);
}

function adjustVolume () {
	song.volume = volumeSlider.value;
}