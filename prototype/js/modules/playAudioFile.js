import startRecording from "./startRecording.js";
import checkRank from "./checkRank.js";

export default function playAudioFile(audioEl) {
	document.body.classList.add("playing");
	console.log(audioEl);
	const rankObj = checkRank(audioEl.dataset.rank);
	audioEl.play();
	audioEl.onended = () => {
		console.log("audio ended")
		document.body.classList.remove("playing");
		setTimeout(() => {
			startRecording(rankObj);
		}, 300)
	}
	audioEl.addEventListener("ended", () => {
		console.log("audio ended")
		document.body.classList.remove("playing");
		setTimeout(() => {
			startRecording(rankObj);
		}, 300)
	})
}