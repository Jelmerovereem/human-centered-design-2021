import { intro, tutorial, chooseBook } from "./utils/audioFiles.js";
import playAudioFile from "./playAudioFile.js";

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const words = ["test", "hoi"];
const grammarTest = `#JSGF V1.0; grammar test; public <word> = ${words.join("|")};`;

const feedbackEl = document.querySelector(".feedback");

export default function startRecording(rankObj) {
	const recognition  = new SpeechRecognition();
	const speechRecognitionList = new SpeechGrammarList();
	speechRecognitionList.addFromString(grammarTest, 1);
	recognition.continuous = false;
	recognition.lang = "nl-NL";
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;

	const audioEl = document.createElement("audio");
	audioEl.src = "assets/recording.wav";
	audioEl.play();

	//let resultText;

	recognition.start();
	recognition.addEventListener("audiostart", () => {
		document.body.classList.add("recording");
	});
	recognition.addEventListener("audioend", (event) => {
		console.log("clicked on stop")
		document.body.classList.remove("recording");
		recognition.stop();
	})

	function checkAnswer(resultText) {
		for (var index = 0; index < rankObj.answers.length; index++) {
			if (rankObj.answers[index].text === resultText) {
				console.log(rankObj.answers[index]);
				playAudioFile(rankObj.answers[index].next);
				break;
			} else {
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



	document.body.addEventListener("keyup", (event) => {
		if (event.code === "Enter") {
			recognition.stop();
			const enterIndex = rankObj.answers.findIndex(obj => obj.key === "Enter");
			playAudioFile(rankObj.answers[enterIndex].next)
		}
		if (event.code === "Space") {
			recognition.stop();
			const spaceIndex = rankObj.answers.findIndex(obj => obj.key === "Space");
			playAudioFile(rankObj.answers[spaceIndex].next);
		}
	})
}