const intro = document.createElement("audio");
intro.src = "assets/intro.mp3";
intro.dataset.rank = "intro";

const tutorial = document.createElement("audio");
tutorial.src = "assets/tutorial.mp3";
tutorial.dataset.rank = "tutorial";

const chooseBook = document.createElement("audio");
chooseBook.src = "assets/chooseBook.mp3";
chooseBook.dataset.rank = "chooseBook";

export { intro, tutorial, chooseBook };