document.addEventListener('DOMContentLoaded', () => {
    // Assuming movies data could be fetched or is predefined in this script
    showMovies(movies);
});
const movies = [
    { title: "Inception", poster_path: "inception.png", vote_average: 8.8, overview: "A thief who steals corporate secrets..." },
    { title: "Interstellar", poster_path: "interstellar.png", vote_average: 8.6, overview: "A team of explorers travel..." },
    { title: "Avengers: Endgame", poster_path: "endgame.png", vote_average: 8.4, overview: "The Avengers assemble once more..." },
    { title: "The Dark Knight", poster_path: "dark.png", vote_average: 9.0, overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice." },
    { title: "The Lord of the Rings: The Fellowship of the Ring", poster_path: "lord.png", vote_average: 8.8, overview: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron." },
    { title: "Iron Man", poster_path: "ironman.png", vote_average: 7.9, overview: "After being held captive in an Afghan cave, billionaire engineer Tony Stark builds a unique weaponized suit of armor to fight evil." },
    { title: "Wonder Woman", poster_path: "wonderwoman.png", vote_average: 7.4, overview: "When a pilot crashes and tells of conflict in the outside world, Diana, an Amazonian warrior in training, leaves home to fight a war, discovering her full powers and true destiny." },
    { title: "Thor: Ragnarok", poster_path: "thor.png", vote_average: 7.9, overview: "Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela." },
    { title: "Justice League", poster_path: "justice.png", vote_average: 6.1, overview: "Fueled by his restored faith in humanity and inspired by Superman's selfless act, Bruce Wayne enlists the help of his newfound ally, Diana Prince, to face an even greater enemy." },
    { title: "The Lord of the Rings: The Return of the King", poster_path: "l2.png", vote_average: 8.9, overview: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring." },
    { title: "Guardians of the Galaxy", poster_path: "guardian.png", vote_average: 8.0, overview: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe." },
    { title: "Man of Steel", poster_path: "man.png", vote_average: 7.0, overview: "Clark Kent, one of the last survivors of Krypton, must come to terms with his extraordinary powers and protect Earth from a menacing threat." }
    // Continue with other movies
];


function showMovies(movies) {
    const main = document.getElementById('main');
    main.innerHTML = ''; // Clear previous content
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-card'); // Ensure movie-card class is added
        movieElement.innerHTML = `
            <img src="${movie.poster_path}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="rating">Rating: ${movie.vote_average}</span>
            </div>
            <div class="movie-overview">${movie.overview}</div>
            <select class="rating-select">${Array.from({length: 10}, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}</select>
            <button onclick="addRating('${movie.title}', this.previousElementSibling.value)">Rate</button>
            <button onclick="addReview('${movie.title}')">Add Review</button>
            <button onclick="viewReviews('${movie.title}')">View Reviews</button>
        `;
        main.appendChild(movieElement); // Append movie card to the grid container
    });
}


function isLoggedIn() {
    // Replace with actual logic to check user session or local storage
    return sessionStorage.getItem('isLoggedIn') === 'true';
    sessionStorage.removeItem('isLoggedIn');
}

function addRating(title, rating) {
    if (!isLoggedIn()) {
        alert('Please log in to rate movies.');
        return;
    }
    fetch('add_rating.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, rating })
    }).then(response => response.json())
      .then(data => alert(data.message))
      .catch(error => console.error('Error:', error));
}

function addReview(title) {
    if (!isLoggedIn()) {
        alert('Please log in to add a review.');
        return;
    }
    const review = prompt(`Enter your review for ${title}:`);
    if (review) {
        fetch('add_review.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, review })
        }).then(response => response.json())
          .then(data => alert(data.message))
          .catch(error => console.error('Error:', error));
    }
}

function viewReviews(title) {
    if (!isLoggedIn()) {
        alert('Please log in to view reviews.');
        return;
    }
    fetch(`get_reviews.php?title=${encodeURIComponent(title)}`)
        .then(response => response.json())
        .then(data => {
            alert(`Reviews for ${title}:\n${data.reviews.join('\n')}`);
        })
        .catch(error => console.error('Error:', error));
}

