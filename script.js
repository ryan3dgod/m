// Global variables
let startTime;
let timerInterval;
let isTiming = false;
let difficulty = 1; // 0 for easy, 1 for medium, 2 for hard, 3 for extreme
const difficulties = [20, 15, 10, 6]; // Corresponding times for each difficulty level in seconds

// Event listeners
document.body.addEventListener('keydown', function(event) {
 if (event.code === 'Space') {
  event.preventDefault();
  toggleTimer();
 }
});

document.body.addEventListener('click', function(event) {
 toggleTimer();
});

document.getElementById('easyBtn').addEventListener('click', function() {
 toggleButton(this);
 changeDifficulty(0);
});

document.getElementById('mediumBtn').addEventListener('click', function() {
 toggleButton(this);
 changeDifficulty(1);
});

document.getElementById('hardBtn').addEventListener('click', function() {
 toggleButton(this);
 changeDifficulty(2);
});

document.getElementById('extremeBtn').addEventListener('click', function() {
 toggleButton(this);
 changeDifficulty(3);
});

document.getElementById('stopBtn').addEventListener('click', function() {
 isTiming = false;
 clearInterval(timerInterval);

 // Display the time taken
 displayTime();
});

// Functions
function toggleTimer() {
 if (!isTiming) {
  isTiming = true;
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 10);
 } else {
  isTiming = false;
  clearInterval(timerInterval);
 }
}

function changeDifficulty(difficultyLevel) {
 isTiming = false; // Stop the timer before changing the difficulty
 difficulty = difficultyLevel;
 // Update the difficulty level text
 document.getElementById('difficulty-level').textContent = `Difficulty: ${getDifficultyText(difficultyLevel)}`;
 // Start the timer again with the new difficulty
 isTiming = true;
 startTime = Date.now();
 timerInterval = setInterval(updateTimer, 10);
}

function toggleButton(button) {
 // Remove the active class from all buttons
 const buttons = document.querySelectorAll('.button');
 for (const button of buttons) {
  button.classList.remove('active');
 }

 // Add the active class to the clicked button
 button.classList.add('active');

 // Update the difficulty level
 changeDifficulty(button.id);
}

function updateTimer() {
 if (isTiming) {
  const currentTime = Date.now();
  const elapsedTime = (currentTime - startTime) / 1000;
  document.getElementById('timer').textContent = `Time: ${elapsedTime.toFixed(1)} seconds`;

  if (elapsedTime == difficulties[difficulty]) {
   playTingSound();
  }
 }
}

function displayTime() {
 // Display the time taken
 const elapsedTime = (Date.now() - startTime) / 1000;
 const messageElement = document.getElementById('message');
 messageElement.textContent = `Time taken: ${elapsedTime.toFixed(1)} seconds`;
}

function playTingSound() {
 const tingSound = document.getElementById('tingSound');
 tingSound.play();
}

function getDifficultyText(difficultyLevel) {
 switch (difficultyLevel) {
  case 0:
   color = 'green';
   return 'Easy';
  case 1:
   return 'Medium';
  case 2:
   return 'Hard';
  case 3:
   return 'Extreme';
  default:
   return 'Unknown';
 }
}