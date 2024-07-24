// const myLibrary = [];

const cards = document.querySelector('.book-cards');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${pages} pages, ${this.read ? `read` : 'not read yet'}.`;
    }

    display() {

        let item = document.createElement('div');
        item.classList.add('item');
        cards.appendChild(item);

        let titleText = document.createElement('h2');
        titleText.textContent = this.title;
        item.appendChild(titleText);

        let authorText = document.createElement('p');
        authorText.textContent = this.author;
        item.appendChild(authorText);

        let pagesText = document.createElement('p');
        pagesText.textContent = `${this.pages} pages`;
        item.appendChild(pagesText);

        let readContainer = document.createElement('div');
        readContainer.classList.add('read-container');

        let readCheckbox = document.createElement('input');
        readCheckbox.id = 'read-checkbox';
        readCheckbox.name = 'read';
        readCheckbox.type = 'checkbox';

        if (this.read) readCheckbox.checked = true;

        readContainer.appendChild(readCheckbox);

        let readLabel = document.createElement('label');
        readLabel.for = 'read-checkbox';
        readLabel.textContent = 'Read';

        readCheckbox.addEventListener('change', () => {
            this.read = readCheckbox.checked;
        });

        readContainer.appendChild(readLabel);

        item.appendChild(readContainer);

        let removeButton = document.createElement('button');
        removeButton.classList.add('remove-book-button');
        removeButton.textContent = 'REMOVE';
        removeButton.value = this.title;
        removeButton.addEventListener('click', () => { Library.removeBook(removeButton.value) });

        item.appendChild(removeButton);

    }
}

class Library {
    static collection = [];

    static addBook(book) {
        if (book instanceof Book) {
            this.collection.push(book);
        }
    }

    static displayAll() {
        cards.innerHTML = '';

        for (const book of this.collection) {
            book.display();
        }
    }

    static getLastBook(){
        return this.collection[this.collection.length-1];
    }

    static removeBook(title) {
        for (let index in this.collection) {
            if (title == this.collection[index].title) {
                this.collection.splice(index, 1);
            }
        }
    
        this.displayAll();
    }
}

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;

//     this.info = function () {
//         return `${title} by ${author}, ${pages} pages, ${read ? `read` : 'not read yet'}.`;
//     };
// }

// function addBookToLibrary(book) {
//     if (book instanceof Book) {
//         myLibrary.push(book);
//     }
// }

//default books
Library.addBook(new Book('Cloud Cuckoo Land', 'Anthony Doerr', 640, true));
Library.addBook(new Book('Diary of a Young Girl', 'Anne Frank', 280, true));
Library.addBook(new Book('1984', 'George Orwell', 328, true));
Library.addBook(new Book('The Song of Achilles', 'Madeline Miller', 416, false));

// const cards = document.querySelector('.book-cards');

// function displayAllBooks() {
//     cards.innerHTML = '';

//     for (const book of myLibrary) {
//         displayBook(book);
//     }
// }

//displays all books when webpage is loaded
Library.displayAll();

//User interface
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');

const formTitle = document.getElementById('title');
const formAuthor = document.getElementById('author');
const formPages = document.getElementById('pages');
const formReadYes = document.getElementById('yes');

const newBookButton = document.querySelector('.new-book-button');
newBookButton.addEventListener('click', () => {
    dialog.showModal();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    dialog.close();

    Library.addBook(new Book(formTitle.value, formAuthor.value, formPages.value, formReadYes.value ? true : false));

    form.reset();

    Library.getLastBook().display();
})

const cancelButton = document.querySelector('.cancel-button');
cancelButton.addEventListener('click', () => {
    form.reset();
    dialog.close();
});

// function removeBook(title) {
//     for (index in this.collection) {
//         if (title == this.collection[index].title) {
//             this.collection.splice(index, 1);
//         }
//     }

//     Library.displayAll();
// }