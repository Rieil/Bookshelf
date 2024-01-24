<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bookshelf";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the request
$data = json_decode(file_get_contents("php://input"), true);

// Insert book into the database
    $title = $data['title'];
    $author = $data['author'];
    $genre = $data['genre'];
    $year = $data['year'];

$sql = "INSERT INTO books (title, author, genre, year) VALUES ('$title', '$author', '$genre', '$year')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("message" => "Book added successfully"));
} else {
    echo json_encode(array("error" => "Error adding book: " . $conn->error));
}

$conn->close();

?>