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
savedBooks.src = "assets/savedBooks.mp3";
savedBooks.dataset.rank = "savedBooks";

const books = document.createElement("audio");
books.src = "assets/books.mp3";
books.dataset.rank = "books";

const ooggetuige = document.createElement("audio");
ooggetuige.src = "assets/ooggetuige.mp3";
ooggetuige.dataset.rank = "ooggetuige";

const finishedBook = document.createElement("audio");
finishedBook.src = "assets/finishedBook.mp3";
finishedBook.dataset.rank = "finishedBook";

export { intro, tutorial, chooseBook, savedBooks, books, ooggetuige, finishedBook };
