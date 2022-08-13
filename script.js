let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(bookObj) {
    const newBook = new Book(
        bookObj.title,
        bookObj.author,
        bookObj.pages,
        bookObj.read
    );

    myLibrary.push(newBook);
}

function showLibrary() {
    const container = document.getElementById('container');
    myLibrary.forEach(function (book, i) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = i;

        const title = document.createElement('p');
        title.textContent = `Title: ${book.title}`;
        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;
        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;

        // "Read" button
        const readBtn = document.createElement('button');
        if (book.read) {
            readBtn.style.backgroundColor = '#7FFFD4';
            readBtn.textContent = 'Read';
        } else {
            readBtn.style.backgroundColor = '#ff0000';
            readBtn.textContent = 'Not read';
        }
        readBtn.addEventListener('click', (e) => {
            const bookId = e.target.parentNode.id;
            const book = myLibrary[bookId];
            console.log(book.read);
            changeReadBtn(book, readBtn)
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            myLibrary.splice(card.id, 1);
            clearScreen();
            showLibrary();
        });

        card.append(title, author, pages, readBtn, deleteBtn);
        container.appendChild(card);
    });
}

function changeReadBtn(book, readBtn) {
    if (!book.read) {
        readBtn.style.backgroundColor = '#7FFFD4';
        readBtn.textContent = 'Read';
    } else {
        readBtn.style.backgroundColor = '#ff0000';
        readBtn.textContent = 'Not read';
    }
    book.read = !book.read;
}

function clearScreen() {
    const container = document.getElementById('container');
    const button = document.querySelector('#container > button');
    while (button.nextSibling) {
        container.removeChild(container.lastChild);
    }
}

const formBtn = document.querySelector('#container > button');
formBtn.addEventListener('click', function (e) {
    const form = document.getElementById('form');
    form.style.right = '';
    form.style.left = '25%';
});

const submitBtn = document.querySelector('#form > button');
submitBtn.addEventListener('click', function (e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);

    const form = document.getElementById('form');
    form.style.right = '2500%';
    form.style.left = '';
    clearScreen();
    showLibrary();
});

const book1 = {
    title: '12 rules for life',
    author: 'JBP',
    pages: '300',
    read: true,
};

const book2 = {
    title: 'Quantitative Investment Analysis',
    author: 'Multiple authors',
    pages: '800+',
    read: false,
};

addBookToLibrary(book1);
addBookToLibrary(book2);

showLibrary();
