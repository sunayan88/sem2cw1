<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $title = $data['title'];
    $review = $data['review'];
    $user_id = $_SESSION['user_id'];

    // Check if the user is logged in
    if (!isset($user_id)) {
        echo json_encode(["message" => "User not logged in"]);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO reviews (user_id, movie_title, review) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $user_id, $title, $review);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Review added successfully"]);
    } else {
        echo json_encode(["message" => "Failed to add review"]);
    }

    $stmt->close();
    $conn->close();
}
?>
