import playAudioFile from "./modules/playAudioFile.js";
import { intro } from "./modules/utils/audioFiles.js";
const introEl = document.querySelector(".intro");

window.shouldRecord = true;

document.body.addEventListener("keyup", (e) => {
	if (e.code === "KeyB") {
		playAudioFile(intro);
	}
})

document.querySelector(".startKey").addEventListener("click", () => {
	playAudioFile(intro);
})