import { intro, tutorial, chooseBook, savedBooks, books } from "./utils/audioFiles.js";
console.log(savedBooks)
export default function checkRank(rank) {
	let rankObj = {};
	switch(rank) {
		case "intro":
			rankObj.element = intro;
			rankObj.answers = [ // vraag of hij tutorial wilt horen
				{
					text: "uitleg",
					key: "Enter",
					keyText: "Enter",
					next: tutorial,
					parent: "intro"
				},
				{
					text: "boek kiezen",
					key: "Space",
					keyText: "Spatie",
					next: chooseBook,
					parent: "intro"
				}
			];
			break;
		case "tutorial":
			rankObj.element = tutorial;
			rankObj.answers = [ // vraag is of hij wilt doorgaan naar choosebook
				{
					text: "boek kiezen",
					key: "Enter",
					keyText: "Enter",
					next: chooseBook,
					parent: "tutorial"
				},
				{
					text: "uitleg",
					key: "Space",
					keyText: "Spatie",
					next: tutorial,
					parent: "tutorial"
				}
			]
			break;
		case "chooseBook":
			rankObj.element = chooseBook;
			rankObj.answers = [
				{
					text: "opgeslagen",
					key: "Enter",
					keyText: "Enter",
					next: savedBooks
				},
				{
					text: "actie",
					key: "Digit1",
					keyText: "1",
					next: books
				},
				{
					text: "sport",
					key: "Digit2",
					keyText: "2",
					next: books
				}
				];
			break;
		default:
			console.log("niks opgevangen")
	}

	return rankObj;
}