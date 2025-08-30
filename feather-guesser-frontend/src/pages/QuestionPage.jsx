import React, { useState, useEffect, useRef } from "react";
import { getRandomIncorrectResponse } from "../utils/incorrectResponses";
import { getRandomCorrectResponse } from "../utils/correctResponses";
import {
  Box,
  Stack,
  Typography,
  Button,
  LinearProgress,
  Tooltip,
  IconButton,
  CardMedia,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CenteredPage from "../components/CenteredPage";

function shuffle(array) {
  // Fisher-Yates shuffle
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const QUESTION_TIME = 30; // seconds
const REVEAL_TIME = 10; // seconds
const QUESTIONS_PER_GAME = 10;

export default function QuestionPage({ onEndGame, onQuit, removeWrongAnswers = false }) {
  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameQuestions, setGameQuestions] = useState([]); // <-- Add this line
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(QUESTION_TIME);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selected, setSelected] = useState(null);
  const [choices, setChoices] = useState([]);
  const [removedIndexes, setRemovedIndexes] = useState([]);
  const [removalTimers, setRemovalTimers] = useState({}); // for cleanup
  const [incorrectMsg, setIncorrectMsg] = useState("");
  const [correctMsg, setCorrectMsg] = useState("");
  const timerRef = useRef();

  // Load bird data
  useEffect(() => {
    fetch("/birds.json")
      .then((res) => res.json())
      .then((data) => {
        setBirds(data.filter((b) => b.CommonName && b.ImageUrl));
        setLoading(false);
      });
  }, []);

  // Setup questions
  useEffect(() => {
    if (!loading && birds.length > 0) {
      // Pick QUESTIONS_PER_GAME random birds for the game
      setGameQuestions(shuffle(birds).slice(0, QUESTIONS_PER_GAME));
    }
  }, [loading, birds]);



  // Setup choices for current question
  useEffect(() => {
    if (gameQuestions.length > 0 && questionIdx < gameQuestions.length) {
      const correct = gameQuestions[questionIdx];
      let incorrect = shuffle(birds.filter((b) => b.CommonName !== correct.CommonName)).slice(0, 3);
      let opts = shuffle([correct, ...incorrect]);
      setChoices(opts);
      setTimer(QUESTION_TIME);
      setShowAnswer(false);
      setSelected(null);
    }
    // eslint-disable-next-line
  }, [gameQuestions, questionIdx, birds]);

  // Remove wrong answers timer logic (fix: always reset on new choices)
  useEffect(() => {
    setRemovedIndexes([]);
    Object.values(removalTimers).forEach(clearTimeout);
    setRemovalTimers({});
    if (removeWrongAnswers && choices.length > 0) {
      let timers = {};
      timers.first = setTimeout(() => {
        removeOneWrong();
      }, 10000);
      timers.second = setTimeout(() => {
        removeOneWrong();
      }, 20000);
      setRemovalTimers(timers);
    }
    // eslint-disable-next-line
  }, [choices, removeWrongAnswers]);

  // Remove one wrong answer (not already removed, not correct)
  function removeOneWrong() {
    const wrongIndexes = choices
      .map((c, idx) => idx)
      .filter((idx) => idx !== correctIdx && !removedIndexes.includes(idx));
    if (wrongIndexes.length === 0) return;
    // Randomly pick one to remove
    const toRemove = wrongIndexes[Math.floor(Math.random() * wrongIndexes.length)];
    setRemovedIndexes((prev) => [...prev, toRemove]);
  }

  // When answer is shown, clear removed
  useEffect(() => {
    if (showAnswer) setRemovedIndexes([]);
  }, [showAnswer]);

  // Timer logic
  useEffect(() => {
    if (showInfo) return; // Pause timer in info view
    if (showAnswer) {
      if (timer === 0) {
        // Only auto-advance if user hasn't clicked Next
        // (Next button will also advance)
        if (questionIdx < QUESTIONS_PER_GAME - 1) {
          setQuestionIdx((q) => q + 1);
        } else {
          if (onEndGame) onEndGame(score);
        }
        return;
      }
    } else {
      if (timer === 0) {
        setShowAnswer(true);
        setTimer(REVEAL_TIME);
        return;
      }
    }
    timerRef.current = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timer, showAnswer, questionIdx, showInfo, score, onEndGame]);

  function handleNext() {
    setShowInfo(false);
    if (questionIdx < QUESTIONS_PER_GAME - 1) {
      setQuestionIdx((q) => q + 1);
    } else {
      if (onEndGame) onEndGame(score);
    }
  }

  function handleShowInfo() {
    setShowInfo(true);
  }

  function handleBackFromInfo() {
    setShowInfo(false);
  }

  if (loading || gameQuestions.length === 0) {
    return <Typography align="center">Loading...</Typography>;
  }

  const current = gameQuestions[questionIdx];
  const correctIdx = choices.findIndex((b) => b.CommonName === current.CommonName);

  function handleAnswer(idx) {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    setTimer(REVEAL_TIME);
    if (idx === correctIdx) {
      setScore((s) => s + 1);
      setCorrectMsg(getRandomCorrectResponse());
      setIncorrectMsg("");
    } else {
      setIncorrectMsg(getRandomIncorrectResponse());
      setCorrectMsg("");
    }
  }

  return (
    <CenteredPage>
      {/* Quit button in top right, absolute to viewport */}
      <Box sx={{ position: "fixed", top: 16, right: 24, zIndex: 10 }}>
        <Tooltip title="Quit Game">
          <IconButton
            color="error"
            size="large"
            onClick={() => onQuit && onQuit()}
            sx={{ bgcolor: "#fff", boxShadow: 1, ":hover": { bgcolor: "#ffeaea" } }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Stack spacing={{ xs: 1.2, sm: 2 }} alignItems="center" sx={{ width: "100%" }}>
        <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">Question {questionIdx + 1}.{QUESTIONS_PER_GAME}</Typography>
          <Typography variant="subtitle2" fontWeight={700}>{score * 100}</Typography>
        </Stack>
        <Box
          sx={{
            width: { xs: 220, sm: 300, md: 340 }, // Slightly wider, but still not full width
            height: { xs: 180, sm: 240, md: 260 }, // Keep a near-square aspect
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            mb: 0.5,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #e0f7fa 0%, #c8e6c9 60%, #e8f5e9 100%)',
            boxShadow: 2,
            mx: 'auto',
          }}
        >
          <CardMedia
            component="img"
            image={current.ImageUrl}
            alt={current.CommonName}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // revert to cover
              objectPosition: 'center', // center the image
              borderRadius: 2,
              border: showAnswer
                ? selected === correctIdx
                  ? "2px solid #388e3c"
                  : "2px solid #d32f2f"
                : "2px solid #e0e0e0",
              background: 'transparent',
              maxHeight: '100%',
              maxWidth: '100%',
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" align="center" sx={{ fontSize: 12 }}>
          {current.ImageAttribution}
        </Typography>
        {/* Info View */}
        {showInfo ? (
          <Box width="100%" mt={2}>
            <Box
              sx={{
                minHeight: { xs: 120, sm: 150, md: 180 },
                maxHeight: { xs: 180, sm: 220, md: 240 },
                height: { xs: 180, sm: 180, md: 200 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflowY: 'auto',
                mb: 2,
                width: '100%',
              }}
            >
              <Typography
                variant="body1"
                align="left"
                sx={{ mb: 0, width: '100%' }}
                dangerouslySetInnerHTML={{ __html: current.SpeciesDescription }}
              />
            </Box>
            <Button
              variant="outlined"
              color="primary"
              href={current.InfoUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mb: 2, width: "100%" }}
            >
              Learn more on Wikipedia
            </Button>
            <Stack direction="row" spacing={2} width="100%">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleBackFromInfo}
                sx={{ flex: 1, fontWeight: 600, fontSize: 16, borderRadius: 2 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ flex: 1, fontWeight: 600, fontSize: 16, borderRadius: 2 }}
              >
                Next
              </Button>
            </Stack>
          </Box>
        ) : (
          <>
            {/* Timer and feedback */}
            <Box width="100%">
              <LinearProgress
                variant="determinate"
                value={showAnswer ? 100 : (timer / QUESTION_TIME) * 100}
                sx={{ height: 10, borderRadius: 5, mb: 1, bgcolor: "#e0f2f1", '& .MuiLinearProgress-bar': { bgcolor: showAnswer ? (selected === correctIdx ? "#388e3c" : "#d32f2f") : "#388e3c" } }}
              />
              <Typography align="center" fontWeight={600} color={showAnswer ? (selected === correctIdx ? "#388e3c" : "#d32f2f") : "#2e7d32"}>
                {showAnswer
                  ? selected === null
                    ? "Time's up!"
                    : selected === correctIdx
                      ? correctMsg || "Correct!"
                      : incorrectMsg || "Incorrect"
                  : `${timer}`}
              </Typography>
            </Box>
            {/* Answer buttons */}
            <Stack spacing={{ xs: 0.7, sm: 1 }} width="100%">
              {choices.map((bird, idx) => {
                const isRemoved = removedIndexes.includes(idx);
                return (
                  <Fade in={!isRemoved} key={bird.CommonName} timeout={500}>
                    <div>
                      <Button
                        variant={showAnswer && idx === correctIdx ? "contained" : "outlined"}
                        color={showAnswer ? (idx === correctIdx ? "success" : idx === selected ? "error" : "inherit") : "primary"}
                        onClick={() => handleAnswer(idx)}
                        disabled={showAnswer || isRemoved}
                        sx={{
                          width: "100%",
                          fontWeight: 600,
                          fontSize: 16,
                          borderRadius: 2,
                          py: { xs: 0.7, sm: 1.2 },
                          bgcolor: showAnswer && idx === correctIdx ? "#c8e6c9" : undefined,
                          borderColor: showAnswer && idx === correctIdx ? "#388e3c" : undefined,
                          opacity: isRemoved ? 0.3 : 1,
                          textDecoration: isRemoved ? "line-through" : "none",
                          transition: "opacity 0.5s, background 0.5s",
                        }}
                      >
                        {String.fromCharCode(65 + idx)}: {bird.CommonName}
                      </Button>
                    </div>
                  </Fade>
                );
              })}
              {/* Reserve space for More Info and Next buttons to prevent screen jump */}
              <Box sx={{ height: 56, mt: 2, width: "100%" }}>
                {showAnswer && timer > 0 ? (
                  <Stack direction="row" spacing={2} width="100%">
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={handleShowInfo}
                      sx={{ flex: 1, fontWeight: 600, fontSize: 16, borderRadius: 2 }}
                    >
                      More Info
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      sx={{ flex: 1, fontWeight: 600, fontSize: 16, borderRadius: 2 }}
                    >
                      Next
                    </Button>
                  </Stack>
                ) : (
                  // Invisible placeholder to reserve space
                  <Box sx={{ height: 40, width: "100%", visibility: "hidden" }}>
                    <Stack direction="row" spacing={2} width="100%">
                      <Button sx={{ flex: 1 }} />
                      <Button sx={{ flex: 1 }} />
                    </Stack>
                  </Box>
                )}
              </Box>
            </Stack>
          </>
        )}
      </Stack>
    </CenteredPage>
  );
}
