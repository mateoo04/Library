const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read ? `read` : 'not read yet'}.`;
    };
}

function addBookToLibrary(book) {
    if (book instanceof Book) { 
        myLibrary.push(book); 
    }
}

addBookToLibrary(new Book('hey', 'its me', 300, true));