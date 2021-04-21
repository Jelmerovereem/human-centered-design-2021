const choicesContainer = document.querySelector(".choices");

export default function showChoiceKeys(rankObj) {
	choicesContainer.innerHTML = "";
	rankObj.answers.forEach((answer) => {
		const pElement = document.createElement("p");
		const keySpan = document.createElement("span");
		keySpan.classList.add("key");
		keySpan.textContent = answer.keyText;
		pElement.append(keySpan);
		pElement.append(` - ${answer.text}`);
		choicesContainer.append(pElement);
	})
}