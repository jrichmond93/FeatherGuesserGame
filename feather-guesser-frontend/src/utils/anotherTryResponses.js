// Returns a random encouragement for "Another Try" after a wrong answer
const ANOTHER_TRY_RESPONSES = [
  "Incorrect! Give it another shot?",
  "Not Quite! Try a different answer?",
  "Oops! Pick again?",
  "Nope! Choose another?",
  "Nope! One more guess?",
  "Almost! Take another look?",
  "Missed It! Try a new choice?",
  "Wrong Feather! Choose another?",
  "So Close! Second chance?",
  "Not this time! Try again?",
  "Wrong Feather! Pick a different feather?",
  "Missed It! Try again?",
  "Oof! Another guess?",
  "Wrong! Try once more?",
  "Whoops! You’re close—give it another go?",
  "Not the one! Keep guessing?",
  "Better luck next time! Try a new answer?",
  "Don’t give up! Try again?",
  "That’s not it! Choose again?"
];

export function getRandomAnotherTryResponse() {
  return ANOTHER_TRY_RESPONSES[Math.floor(Math.random() * ANOTHER_TRY_RESPONSES.length)];
}
