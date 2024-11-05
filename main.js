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