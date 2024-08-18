<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $title = $data['title'];
    $rating = $data['rating'];
    $user_id = $_SESSION['user_id']; // Ensure user is logged in

    // Insert or update the rating
    $stmt = $conn->prepare("INSERT INTO ratings (user_id, movie_title, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?");
    $stmt->bind_param("issi", $user_id, $title, $rating, $rating);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Rating added successfully"]);
    } else {
        echo json_encode(["message" => "Failed to add rating"]);
    }

    $stmt->close();
    $conn->close();
}
?>
