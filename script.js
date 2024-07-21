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
        console.log(book);
    }
}

addBookToLibrary(new Book('Cloud Cuckoo Land', 'Anthony Doerr', 640, true));
addBookToLibrary(new Book('Diary of a Young Girl', 'Anne Frank', 280, true));
addBookToLibrary(new Book('1984', 'George Orwell', 328, true));
addBookToLibrary(new Book('The Song of Achilles', 'Madeline Miller', 416, false));

const cards = document.querySelector('.book-cards');

function displayBook(book) {
    let newBook = myLibrary[myLibrary.length - 1];

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

    if (book.read) {
        const checkmark = document.createElement('i');
        checkmark.classList.add('fa-solid', 'fa-check');
        item.appendChild(checkmark);
    } else {
        const checkmark = document.createElement('i');
        checkmark.classList.add('fa-solid', 'fa-x');
        item.appendChild(checkmark);
    }

    let removeButton = document.createElement('button');
    removeButton.classList.add('remove-book-button');
    removeButton.textContent = 'REMOVE';
    removeButton.value = book.title;
    removeButton.addEventListener('click', () => { removeBook(removeButton.value) });

    item.appendChild(removeButton);

    cards.appendChild(item);
}

//Displaying books on start and after deletion of one of them
function displayAllBooks() {
    cards.innerHTML = '';

    for (const book of myLibrary) {
        displayBook(book);
    }
}

displayAllBooks();

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

    addBookToLibrary(new Book(formTitle.value, formAuthor.value, formPages.value, formReadYes.value ? true : false));

    form.reset();

    displayBook(myLibrary[myLibrary.length - 1]);
})

const cancelButton = document.querySelector('.cancel-button');
cancelButton.addEventListener('click', () => {
    form.reset();
    dialog.close();
});

function removeBook(title) {
    for (index in myLibrary) {
        if (title == myLibrary[index].title) {
            myLibrary.splice(index, 1);
        }
    }

    displayAllBooks();
}