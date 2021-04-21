import { intro, tutorial, chooseBook } from "./utils/audioFiles.js";

export default function checkRank(rank) {
	let rankObj = {};
	switch(rank) {
		case "intro":
			rankObj.answers = [ // vraag of hij tutorial wilt horen
				{
					text: "uitleg",
					key: "Enter",
					next: tutorial,
					parent: "intro"
				},
				{
					text: "boek kiezen",
					key: "Space",
					next: chooseBook,
					parent: "intro"
				}
			];
			break;
		case "tutorial":
			rankObj.answers = [ // vraag is of hij wilt doorgaan naar choosebook
				{
					text: "boek kiezen",
					key: "Enter",
					next: chooseBook,
					parent: "tutorial"
				},
				{
					text: "uitleg",
					key: "Space",
					next: tutorial,
					parent: "tutorial"
				}
			]
			break;
		case "chooseBook":
			rankObj.answers = [
				{
					text: "opgeslagen",
					key: "Enter",
					next: savedBooks
				},
				{
					text: "actie",
					key: "Digit1",
					next: books
				},
				{
					text: "sport",
					key: "Digit2",
					next: books
				}
				];
			break;
		default:
			console.log("niks opgevangen")
	}

	return rankObj;
}