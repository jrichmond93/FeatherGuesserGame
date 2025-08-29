// Returns a random correct answer response
const CORRECT_RESPONSES = [
  "Well done!",
  "Nice!",
  "Correct!",
  "You got it!",
  "Great job!",
  "That’s right!",
  "Nailed it!",
  "Awesome!",
  "Bingo!",
  "Perfect!",
  "Spot on!",
  "Yes!",
  "Correctamundo!",
  "Bullseye!",
  "You’re right!",
  "Good work!",
  "Exactly!",
  "Right on!",
  "That’s the one!",
  "You’re a bird expert!",
  "Impressive!"
];

export function getRandomCorrectResponse() {
  return CORRECT_RESPONSES[Math.floor(Math.random() * CORRECT_RESPONSES.length)];
}
