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
addBookToLibrary(new Book('hey', 'its me', 300, true));
addBookToLibrary(new Book('hey', 'its me', 300, true));
addBookToLibrary(new Book('hey', 'its me', 300, true));

const main = document.querySelector('main');

function displayBooks() {
    for (const book of myLibrary) {
        let item = document.createElement('div');
        item.classList.add('item');

        let titleText = document.createElement('h2');
        titleText.textContent = book.title;

        let authorText = document.createElement('p');
        authorText.textContent = book.author;

        let pagesText = document.createElement('p');
        pagesText.textContent = `${book.pages} pages`;

        item.appendChild(titleText);
        item.appendChild(authorText);
        item.appendChild(pagesText);

        main.appendChild(item);
    }
}

displayBooks();