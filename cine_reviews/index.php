<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CineReviews</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>CineReviews</h1>
        <nav>
            <?php session_start(); ?>
            <?php if (isset($_SESSION['user_id'])): ?>
                <span>Welcome, <?= $_SESSION['username'] ?>!</span>
                <a href="logout.php">Logout</a>
            <?php else: ?>
                <a href="login.html">Login</a>
                <a href="register.html">Register</a>
            <?php endif; ?>
        </nav>
    </header>

    <main id="main" class="grid-container">
        <!-- Movies will be loaded here by JavaScript -->
    </main>

    <script src="script.js"></script>
</body>
</html>
