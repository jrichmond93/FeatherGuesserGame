import { useState } from "react";
import Home from "./pages/Home";
import HowToPlay from "./pages/HowToPlay";
import Settings from "./pages/Settings";

import QuestionPage from "./pages/QuestionPage";
import ReverseQuestionPage from "./pages/ReverseQuestionPage";
import EndOfGame from "./pages/EndOfGame";

function App() {
  const [page, setPage] = useState("home");
  const [mode, setMode] = useState("normal"); // "normal" or "reverse"
  const [lastScore, setLastScore] = useState(null);

  if (page === "howtoplay") {
    return <HowToPlay 
      onBack={() => setPage("home")} 
      onPlayNow={() => setPage(mode === "reverse" ? "reverse-question" : "question")}
    />;
  }
  if (page === "settings") {
    return (
      <Settings
        mode={mode}
        onToggleMode={() => setMode(m => (m === "normal" ? "reverse" : "normal"))}
        onBack={() => setPage("home")}
        setPage={setPage}
        currentMode={mode}
      />
    );
  }
  if (page === "question") {
    return <QuestionPage onEndGame={score => { setLastScore(score); setPage("end"); }} onQuit={() => setPage("home")} />;
  }
  if (page === "reverse-question") {
    return <ReverseQuestionPage onEndGame={score => { setLastScore(score); setPage("end"); }} onQuit={() => setPage("home")} />;
  }
  if (page === "end") {
    return <EndOfGame
      score={lastScore}
      maxScore={10}
      onPlayAgain={() => setPage(mode === "reverse" ? "reverse-question" : "question")}
      onHome={() => setPage("home")}
    />;
  }
  return (
    <Home
      onHowToPlay={() => setPage("howtoplay")}
      onSettings={() => setPage("settings")}
      onPlayNow={() => setPage(mode === "reverse" ? "reverse-question" : "question")}
    />
  );
}

export default App;
