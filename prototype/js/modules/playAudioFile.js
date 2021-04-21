import startRecording from "./startRecording.js";
import checkRank from "./checkRank.js";

export default function playAudioFile(audioEl) {
	document.body.classList.remove("error", "recording");
	document.body.classList.add("playing");
	const rankObj = checkRank(audioEl.dataset.rank);
	audioEl.play();
	console.log(`playing ${audioEl.dataset.rank}...`)
	audioEl.onended = () => {
		console.log(`${audioEl.dataset.rank} stopped playing...`)
		document.body.classList.remove("playing");
		setTimeout(() => {
			console.log(`recording answer for ${audioEl.dataset.rank}`)
			startRecording(rankObj);
		}, 300)
	}
}