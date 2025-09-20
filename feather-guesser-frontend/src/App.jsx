import { useState } from "react";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Home from "./pages/Home";
import DidYouKnow from "./pages/DidYouKnow";
import HowToPlay from "./pages/HowToPlay";
import Settings from "./pages/Settings";
import Privacy from "./pages/Privacy";
import QuestionPage from "./pages/QuestionPage";
import ReverseQuestionPage from "./pages/ReverseQuestionPage";
import EndOfGame from "./pages/EndOfGame";
import { Typography } from "@mui/material";

function App() {
  const [page, setPage] = useState("home");
  const [mode, setMode] = useState("normal");
  const [lastScore, setLastScore] = useState(null);
  const [removeWrongAnswers, setRemoveWrongAnswers] = useState(() => {
    const stored = localStorage.getItem("removeWrongAnswers");
    return stored === null ? false : stored === "true";
  });
  const [anotherTry, setAnotherTry] = useState(() => {
    const stored = localStorage.getItem("anotherTry");
    return stored === null ? true : stored === "true";
  });

  const handleToggleRemoveWrongAnswers = () => {
    setRemoveWrongAnswers((prev) => {
      localStorage.setItem("removeWrongAnswers", !prev);
      return !prev;
    });
  };
  const handleToggleAnotherTry = () => {
    setAnotherTry((prev) => {
      localStorage.setItem("anotherTry", !prev);
      return !prev;
    });
  };

  if (page === "didyouknow") {
    return <DidYouKnow onBack={() => setPage("home")} />;
  }
  if (page === "about") {
    return <About 
      onBack={(target) => {
        if (target === "home") setPage("home");
        else if (target === "about") setPage("about");
        else if (target === "privacy") setPage("privacy");
        else if (target === "terms") setPage("terms");
        else if (target === "contact") setPage("contact");
        else setPage("settings");
      }}
      onPlayNow={() => setPage(mode === "reverse" ? "reverse-question" : "question")}
    />;
  }
  if (page === "contact") {
    return <Contact 
      onBack={(target) => {
        if (target === "home") setPage("home");
        else if (target === "about") setPage("about");
        else if (target === "privacy") setPage("privacy");
        else if (target === "terms") setPage("terms");
        else if (target === "contact") setPage("contact");
        else setPage("settings");
      }}
      onPlayNow={() => setPage(mode === "reverse" ? "reverse-question" : "question")}
    />;
  }
  if (page === "terms") {
    return <Terms 
      onBack={(target) => {
        if (target === "home") setPage("home");
        else if (target === "about") setPage("about");
        else if (target === "privacy") setPage("privacy");
        else if (target === "terms") setPage("terms");
        else if (target === "contact") setPage("contact");
        else setPage("settings");
      }}
      onPlayNow={() => setPage(mode === "reverse" ? "reverse-question" : "question")}
    />;
  }
  if (page === "privacy") {
    return (
      <Privacy
        onBack={(target) => {
          if (target === "home") setPage("home");
          else if (target === "about") setPage("about");
          else if (target === "privacy") setPage("privacy");
          else if (target === "terms") setPage("terms");
          else if (target === "contact") setPage("contact");
          else setPage("settings");
        }}
        onPlayNow={() => setPage(mode === "reverse" ? "reverse-question" : "question")}
      />
    );
  }
  if (page === "howtoplay") {
    return (
      <HowToPlay
        onBack={() => setPage("home")}
        onPlayNow={() => setPage(mode === "reverse" ? "reverse-question" : "question")}
        onSettings={() => setPage("settings")}
      />
    );
  }
  if (page === "settings") {
    return (
      <Settings
        mode={mode}
        onToggleMode={() => setMode(m => (m === "normal" ? "reverse" : "normal"))}
        onBack={() => setPage("home")}
        setPage={setPage}
        currentMode={mode}
        removeWrongAnswers={removeWrongAnswers}
        onToggleRemoveWrongAnswers={handleToggleRemoveWrongAnswers}
        setRemoveWrongAnswers={setRemoveWrongAnswers}
        anotherTry={anotherTry}
        setAnotherTry={setAnotherTry}
        onToggleAnotherTry={handleToggleAnotherTry}
      />
    );
  }
  if (page === "question") {
    return <QuestionPage 
      onEndGame={score => { setLastScore(score); setPage("end"); }} 
      onQuit={() => setPage("home")} 
      removeWrongAnswers={removeWrongAnswers}
      anotherTry={anotherTry}
    />;
  }
  if (page === "reverse-question") {
    return <ReverseQuestionPage 
      onEndGame={score => { setLastScore(score); setPage("end"); }} 
      onQuit={() => setPage("home")} 
      removeWrongAnswers={removeWrongAnswers}
      anotherTry={anotherTry}
    />;
  }
  if (page === "end") {
    return <EndOfGame
      score={lastScore}
      maxScore={10}
      onPlayAgain={() => setPage(mode === "reverse" ? "reverse-question" : "question")}
      onHome={() => setPage("home")}
      onSwitchMode={() => {
        const newMode = mode === "normal" ? "reverse" : "normal";
        setMode(newMode);
        setPage(newMode === "reverse" ? "reverse-question" : "question");
      }}
      currentMode={mode}
    />;
  }
  return (
    <Home
      onHowToPlay={() => setPage("howtoplay")}
      onSettings={page => {
        switch (page) {
          case "didyouknow":
            setPage("didyouknow");
            break;
          case "about":
            setPage("about");
            break;
          case "privacy":
            setPage("privacy");
            break;
          case "terms":
            setPage("terms");
            break;
          case "contact":
            setPage("contact");
            break;
          case "settings":
          default:
            setPage("settings");
        }
      }}
      onPlayNow={() => setPage(mode === "reverse" ? "reverse-question" : "question")}
    />
  );
}

export default App;
