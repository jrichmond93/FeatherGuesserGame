// Returns a random incorrect answer response
const INCORRECT_RESPONSES = [
  "Try Again!",
  "Oops!",
  "Not Quite!",
  "Incorrect!",
  "Missed It!",
  "Nope!",
  "Give it another go!",
  "Almost!",
  "Not this time!",
  "Keep Trying!",
  "So Close!",
  "Wrong Feather!",
  "Better luck next time!",
  "Not the one!",
  "Oof!",
  "Nice try!",
  "Whoops!",
  "Maybe next time!",
  "Incorrect, but keep going!",
  "That’s not it!",
  "Good guess, but no!",
  "Don’t give up!"
];

export function getRandomIncorrectResponse() {
  return INCORRECT_RESPONSES[Math.floor(Math.random() * INCORRECT_RESPONSES.length)];
}
