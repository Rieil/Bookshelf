document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const addBookForm = document.getElementById('add-book-form');
    const genreInput = document.getElementById('genre');
    const genreSuggestions = document.getElementById('genre-suggestions');
    const bookListTableBody = document.querySelector('#book-list tbody');
    const notification = document.getElementById('notification');

    // List of available genres
    const availableGenres = [
        'Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Romance',
        'Science Fiction', 'Fantasy', 'History', 'Post-Apocalyptic', 'Young Adult',
        'Historical Fiction', 'Philosophy', 'Horror', 'Adventure', 'Dystopian',
        'Biography', 'Memoir', 'Self-Help', 'Cookbook', 'Poetry',
        'Business', 'Travel', 'Science', 'Comedy', 'Satire',
        'Crime', 'Western', 'Suspense', 'Action', 'Children',
        'Graphic Novel', 'Art', 'Music', 'Sports', 'Psychology',
        'Anthology', 'Short Stories', 'Classic', 'Contemporary', 'Literary Fiction'];
    
    // Function to filter genres based on user input
    function filterGenres(input) {
        return availableGenres.filter(genre => genre.toLowerCase().includes(input.toLowerCase()));
    }

    // Function to update genre suggestions while user is typing
    function updateGenreSuggestions() {
        const input = genreInput.value;
        const filteredGenres = filterGenres(input);

        genreSuggestions.innerHTML = '';

        // Create suggestion divs and add event listeners
        filteredGenres.forEach(suggestion => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.textContent = suggestion;
            suggestionDiv.addEventListener('click', () => {
                genreInput.value = suggestion;
                genreSuggestions.innerHTML = '';
            });
            genreSuggestions.appendChild(suggestionDiv);
        });
    }

    // Event listener for genre input changes
    genreInput.addEventListener('input', updateGenreSuggestions);

    // Event listener for adding a new book
    addBookForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form input values
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = genreInput.value;
        const year = document.getElementById('year').value;

        // Send data to PHP backend
        fetch('add_book.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                author,
                genre,
                year,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Show success notification, fetch and display updated book list, and clear input fields
            console.log('Success:', data);
            showNotification('Book Added Successfully');
            fetchBooks();
            clearInputFields();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    // Function to fetch and display the list of books
    function fetchBooks() {
        fetch('get_book.php')
            .then(response => response.json())
            .then(data => {
                // Clear existing book list
                bookListTableBody.innerHTML = '';

                // Iterate through the received data and append rows to the table
                data.forEach(book => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.genre}</td>
                        <td>${book.year}</td>
                    `;
                    bookListTableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
            });
    }

    // Function to show notification and auto-hide after 3 seconds
    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000); // Hide notification after 3 seconds
    }

    // Function to clear input fields after adding a new book
    function clearInputFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('genre').value = '';
        document.getElementById('year').value = '';
    }

    // Initial fetch to display existing books on page load
    fetchBooks();
});
