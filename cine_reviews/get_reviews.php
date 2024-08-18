<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $title = $_GET['title'];

    $stmt = $conn->prepare("SELECT review FROM reviews WHERE movie_title = ?");
    $stmt->bind_param("s", $title);
    $stmt->execute();
    $result = $stmt->get_result();

    $reviews = [];
    while ($row = $result->fetch_assoc()) {
        $reviews[] = $row['review'];
    }

    echo json_encode(["reviews" => $reviews]);

    $stmt->close();
    $conn->close();
}
?>
