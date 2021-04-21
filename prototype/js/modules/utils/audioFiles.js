const intro = document.createElement("audio");
intro.src = "assets/intro.m4a";
intro.dataset.rank = "intro";

const tutorial = document.createElement("audio");
tutorial.src = "assets/tutorial.m4a";
tutorial.dataset.rank = "tutorial";

const chooseBook = document.createElement("audio");
chooseBook.src = "assets/chooseBook.m4a";
chooseBook.dataset.rank = "chooseBook";

export { intro, tutorial, chooseBook };