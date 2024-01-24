BookShelf:

BookShelf is a simple web application for managing a book catalog. Users can add books to the catalog, and the catalog is stored in a MySQL database.

Prerequisites

Before you begin, ensure you have met the following requirements:

- XAMPP installed on your machine.
- Apache and MySQL services are running in XAMPP.
- Access to http://localhost/ for your web server.

Setup

1. Clone the repository to your XAMPP htdocs directory:

    ```bash
    git clone https://github.com/your-username/BookShelf.git
    ```

2. Create a MySQL database named `bookshelf`. You can use the following queries:

    ```sql
    CREATE TABLE books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        genre VARCHAR(255),
        year INT
    );

    INSERT INTO books (title, author, genre, year) VALUES
    -- Your book data here
    ```

3. Ensure Apache and MySQL services are running in XAMPP.

4. Access the application by navigating to http://localhost/BookShelf/ in your web browser.

Usage

- Add books to the catalog using the provided form.
- View the list of books in the catalog.
- ...

Database Queries

In case you need to recreate the database or insert additional data, you can use the following queries:

```sql
-- Create the 'books' table
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255),
    year INT
);

-- Insert sample data
INSERT INTO books (title, author, genre, year) VALUES
-- Your book data here
