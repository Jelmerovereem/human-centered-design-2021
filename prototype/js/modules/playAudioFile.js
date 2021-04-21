import startRecording from "./startRecording.js";
import checkRank from "./checkRank.js";
import showChoiceKeys from "./showChoiceKeys.js";

function goRecord(rankObj) {
	document.body.classList.remove("playing");
	setTimeout(() => {
		startRecording(rankObj);
	}, 300)
}

export default function playAudioFile(audioEl) {
	document.body.classList.remove("error", "recording");
	document.body.classList.add("playing");
	const rankObj = checkRank(audioEl.dataset.rank);
	document.onkeyup = (event) => {
		if (event.code === "KeyT") {
			audioEl.pause();
			audioEl.currentTime = 0;
			//startRecording(rankObj);
		}
	}
	audioEl.play();
	showChoiceKeys(rankObj);
	audioEl.onended = () => {
		console.log("audio ended a seh")
		startRecording(rankObj);
	}
	audioEl.onpause = () => {
		console.log("audio paused a seh")
		startRecording(rankObj)
	}
}