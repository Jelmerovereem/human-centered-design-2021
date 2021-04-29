import { checkKey } from "./startRecording.js";

const choicesContainer = document.querySelector(".choices");

export default function showChoiceKeys(rankObj) {
	choicesContainer.innerHTML = "";
	rankObj.answers.forEach((answer) => {
		const pElement = document.createElement("p");
		const keySpan = document.createElement("span");
		keySpan.dataset.code = answer.key;
		keySpan.classList.add("key");
		keySpan.textContent = answer.keyText;

		keySpan.addEventListener("click", () => {
			let event = {
				code: answer.key
			}
			let rankObj = {
				answers: [answer]
			}
			if (window.currentAudio) {
				window.currentAudio.pause();
				window.shouldRecord = false;
				setTimeout(() => {
					window.shouldRecord = true;
				}, 2000);
			}
			checkKey(event, rankObj);
		})

		pElement.append(keySpan);
		pElement.append(` - ${answer.text}`);
		choicesContainer.append(pElement);
	})
}