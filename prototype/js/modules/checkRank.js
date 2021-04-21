import { intro, tutorial, chooseBook } from "./utils/audioFiles.js";

export default function checkRank(rank) {
	let rankObj = {};
	switch(rank) {
		case "intro":
			rankObj.previous = intro;
			rankObj.choseTrue = tutorial;
			rankObj.choseFalse = chooseBook;
			rankObj.answers = [ // vraag of hij tutorial wilt horen
				{
					text: "ja",
					key: "Enter",
					next: tutorial
				},
				{
					text: "boek kiezen",
					key: "Space",
					next: chooseBook
				}
			];
			break;
		case "tutorial":
			rankObj.answers = [ // vraag is of hij wilt doorgaan naar choosebook
				{
					text: "boek kiezen",
					key: "Enter",
					next: chooseBook
				},
				{
					text: "uitleg",
					key: "Space",
					next: tutorial
				}
			]
			break;
		case "chooseBook":
			rankObj.answers = [];
			break;
		default:
			console.log("niks opgevangen")
	}

	return rankObj;
}