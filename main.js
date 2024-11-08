// Array to hold the books
let books = [];

// Function to load books from localStorage
function loadBooks() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    }
}

// Function to save books to localStorage
function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

// Function to render books to the DOM based on a search query
function renderBooks(searchQuery = '') {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');

    // Clear the current lists
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    // Render books based on the search query
    books.forEach(book => {
        if (book.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            const bookItem = document.createElement('div');
            bookItem.setAttribute('data-bookid', book.id);
            bookItem.setAttribute('data-testid', 'bookItem');

            // Use template literals to insert book data
            bookItem.innerHTML = `
                <h3 data-testid="bookItemTitle">${book.title}</h3>
                <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
                <p data-testid="bookItemYear">Tahun: ${book.year}</p>
                <div class="action-buttons">
                    <button class="is-complete-button" data-testid="bookItemIsCompleteButton" onclick="toggleComplete('${book.id}')">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
                    <button class="delete-button" data-testid="bookItemDeleteButton" onclick="deleteBook('${book.id}')">Hapus Buku</button>
                    <button class="edit-button" data-testid="bookItemEditButton" onclick="editBook('${book.id}')">Edit Buku</button>
                </div>
            `;

            if (book.isComplete) {
                completeBookList.appendChild(bookItem);
            } else {
                incompleteBookList.appendChild(bookItem);
            }
        }
    });
}


// Function to add a new book
function addBook(event) {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById('bookFormTitle').value.trim();
    const author = document.getElementById('bookFormAuthor').value.trim();
    const year = parseInt(document.getElementById('bookFormYear').value.trim(), 10); // Convert to number
    const isComplete = document.getElementById('bookFormIsComplete').checked;

    // Basic validation to ensure fields are filled
    if (title === '' || author === '' || isNaN(year)) { // Check if year is a number
        alert('Please fill in all fields and ensure the year is a valid number.'); 
        return; 
    }

    // Create a new book object
    const newBook = {
        id: Date.now().toString(),
        title,
        author,
        year, // year is now a number
        isComplete
    };

    books.push(newBook);
    saveBooks();
    renderBooks();
    document.getElementById('bookForm').reset();
}

// Function to toggle book completion status
function toggleComplete(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.isComplete = !book.isComplete;
        saveBooks(); // Save to localStorage
        renderBooks(); // Render all books
    }
}

// Function to delete a book
function deleteBook(bookId) {
    books = books.filter(b => b.id !== bookId);
    saveBooks(); // Save to localStorage
    renderBooks(); // Render all books
}

// Function to edit a book (Basic implementation)
function editBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        document.getElementById('bookFormTitle').value = book.title;
        document.getElementById('bookFormAuthor').value = book.author;
        document.getElementById('bookFormYear').value = book.year;
        document.getElementById('bookFormIsComplete').checked = book.isComplete;

        // Optionally remove the book from the array for editing
        deleteBook(bookId);
    }
}

// Event listener for the form submission
document.getElementById('bookForm').addEventListener('submit', addBook);

// Event listener for the search form submission
document.getElementById('searchBook').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const searchQuery = document.getElementById('searchBookTitle').value; // Get the search input
    renderBooks(searchQuery); // Render books based on the search query
});

// Initial load of books from localStorage
loadBooks();

// Initial render
renderBooks();