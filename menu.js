function startGame(difficulty) {
    // Save the selected difficulty in local storage
    localStorage.setItem('difficulty', difficulty);

    // Redirect to the main game page based on difficulty
    if (difficulty === 'easy') {
        window.location.href = 'zmemory-easy.html';
    } else if (difficulty === 'medium') {
        window.location.href = 'zmemory-medium.html';
    } else if (difficulty === 'hard') {
        window.location.href = 'zmemory-hard.html';
    } else if (difficulty === 'hardcore') {
        window.location.href = 'zmemory-hardcore.html';
    }
}

function exit() {
    // Update the URL below to the desired destination URL
    window.location.href = "https://www.google.com";
}