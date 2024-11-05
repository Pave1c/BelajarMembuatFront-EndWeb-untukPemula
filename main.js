// Array to hold the books
let books = [];

// Function to load books from localStorage
function loadBooks() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    }
}