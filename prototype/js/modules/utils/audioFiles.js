const intro = document.createElement("audio");
intro.src = "assets/intro.mp3";
intro.dataset.rank = "intro";

const tutorial = document.createElement("audio");
tutorial.src = "assets/tutorial.mp3";
tutorial.dataset.rank = "tutorial";

const chooseBook = document.createElement("audio");
chooseBook.src = "assets/chooseBook.mp3";
chooseBook.dataset.rank = "chooseBook";

const savedBooks = document.createElement("audio");
savedBooks.src = "assets/short_intro.m4a";
savedBooks.dataset.rank = "savedBooks";

const books = document.createElement("audio");
books.src = "assets/short_intro.m4a";
books.dataset.rank = "books";

export { intro, tutorial, chooseBook, savedBooks, books };