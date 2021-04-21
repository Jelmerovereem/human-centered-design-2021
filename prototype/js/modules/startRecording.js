import { intro, tutorial, chooseBook } from "./utils/audioFiles.js";
import playAudioFile from "./playAudioFile.js";

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const words = ["test", "hoi"];
const grammarTest = `#JSGF V1.0; grammar test; public <word> = ${words.join("|")};`;

const feedbackEl = document.querySelector(".feedback");

function checkKey(event, rankObj) {
	if (event.code === "Enter") {
		console.log("pressed on enter");
		const enterIndex = rankObj.answers.findIndex(obj => obj.key === "Enter");
		playAudioFile(rankObj.answers[enterIndex].next)
	}
	if (event.code === "Space") {
		console.log("pressed on space")
		const spaceIndex = rankObj.answers.findIndex(obj => obj.key === "Space");
		playAudioFile(rankObj.answers[spaceIndex].next);
	}
}

export default function startRecording(rankObj) {
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
		document.body.classList.add("recording");
	});
	recognition.addEventListener("audioend", (event) => {
		//console.log("recognition stopped")
		document.body.classList.remove("recording");
		recognition.stop();
	})

	function checkAnswer(resultText) {
		console.log(resultText);
		for (var index = 0; index < rankObj.answers.length; index++) {
			if (rankObj.answers[index].text === resultText) {
				//console.log(rankObj.answers[index]);
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
				checkAnswer(resultText);
				allFeedback += `${event.results[result][0].transcript}.<br>`;
			}
		}
		feedbackEl.innerHTML = allFeedback;
	})
}