import { intro, tutorial, chooseBook, savedBooks, books, ooggetuige, finishedBook } from "./utils/audioFiles.js";
import playAudioFile from "./playAudioFile.js";

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const words = ["test", "hoi"];
const grammarTest = `#JSGF V1.0; grammar test; public <word> = ${words.join("|")};`;

const feedbackEl = document.querySelector(".feedback");

function checkKey(event, rankObj) {
	if (event.code === "Enter") {
		const index = rankObj.answers.findIndex(obj => obj.key === "Enter");
		feedbackEl.textContent = rankObj.answers[index].text;
		playAudioFile(rankObj.answers[index].next)
	}
	if (event.code === "Space") {
		const index = rankObj.answers.findIndex(obj => obj.key === "Space");
		feedbackEl.textContent = rankObj.answers[index].text;
		playAudioFile(rankObj.answers[index].next);
	}
	if (event.code === "Digit1") {
		const index = rankObj.answers.findIndex(obj => obj.key === "Digit1");
		feedbackEl.textContent = rankObj.answers[index].text;
		playAudioFile(rankObj.answers[index].next)
	}
	if (event.code === "Digit2") {
		const index = rankObj.answers.findIndex(obj => obj.key === "Digit2");
		feedbackEl.textContent = rankObj.answers[index].text;
		playAudioFile(rankObj.answers[index].next)
	}
	if (event.code === "KeyR") {
		playAudioFile(rankObj.element);
	}
}

 function startRecording(rankObj) {
	const recognition = new SpeechRecognition();
	const speechRecognitionList = new SpeechGrammarList();
	speechRecognitionList.addFromString(grammarTest, 1);
	recognition.continuous = false;
	recognition.lang = "nl-NL";
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;

	const bodyElement = document.querySelector("body");
	bodyElement.onkeyup = (event) => {
		recognition.stop();
		checkKey(event, rankObj);
	}

	const notification = document.createElement("audio");
	notification.src = "assets/recording.wav";
	notification.play();

	recognition.start();
	recognition.addEventListener("audiostart", () => {
		document.body.classList.remove("error", "playing");
		document.body.classList.add("recording");
	});
	recognition.addEventListener("audioend", (event) => {
		document.body.classList.remove("recording");
		recognition.stop();
	})

	function checkAnswer(resultText) {
		//console.log(resultText);
		for (var index = 0; index < rankObj.answers.length; index++) {
			if (rankObj.answers[index].text === resultText) {
				console.log(resultText);
				recognition.stop();
				playAudioFile(rankObj.answers[index].next);
				break;
			} else {
				recognition.stop();
				document.body.classList.add("error");
				console.log("resultText komt niet overeen met answer");
			}
		}
	}

	recognition.addEventListener("result", (event) => {
		let allFeedback = "";
		for (const result in event.results) {
			if (!isNaN(result)) {
				let resultText = event.results[result][0].transcript.toLowerCase();
				feedbackEl.textContent = event.results[result][0].transcript;
				allFeedback += `${event.results[result][0].transcript}.<br>`;
				checkAnswer(resultText);
			}
		}
		//feedbackEl.innerHTML = allFeedback;
	})
}


export { checkKey, startRecording };