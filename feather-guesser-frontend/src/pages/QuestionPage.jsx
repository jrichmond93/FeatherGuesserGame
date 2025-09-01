// Fisher-Yates shuffle utility
function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
// IMPORTANT: All React hooks (useState, useEffect, useRef, etc.) must be at the very top of this component.
// Never call hooks inside conditionals, loops, or functions. Never call hooks after a return.
// If you break these rules, you will get a 'Rendered more hooks than during the previous render' error.
import React, { useState, useEffect, useRef } from "react";
// Visually hidden style for screen readers
const srOnly = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: 1,
};

function AnotherTryPlaceholder({ message, onDismiss, dismissRef, onSkip, buttonsDisabled }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 220,
        maxWidth: 340,
        width: '90%',
        minHeight: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        textAlign: 'center',
        bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(80,80,80,0.97)' : 'rgba(255,255,224,0.97)',
        border: '1.5px solid',
        borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(255,193,7,0.25)' : 'rgba(255,193,7,0.18)',
        borderRadius: 2,
        boxShadow: 3,
        py: 1.2,
        px: 2,
        transition: 'background 0.2s',
        backdropFilter: 'blur(2.5px)',
      }}
      data-testid="another-try-placeholder"
    >
      <div aria-live="polite" style={srOnly} key={message}>{message}</div>
  <Typography color="warning.main" fontWeight={600} tabIndex={0} aria-live="polite" sx={{ fontSize: 18, mb: 1 }}>
        {message}
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 0.5, mb: 0.5, width: '100%' }}>
        <Button
          variant="contained"
          color="warning"
          sx={{ fontWeight: 700, fontSize: 16, px: 3, borderRadius: 2, minWidth: 90, boxShadow: 1 }}
          ref={dismissRef}
          onClick={onDismiss}
          tabIndex={0}
          aria-label="Yes"
          disabled={buttonsDisabled}
        >
          Yes
        </Button>
        <Button
          variant="outlined"
          color="warning"
          sx={{ fontWeight: 700, fontSize: 16, px: 3, borderRadius: 2, minWidth: 90 }}
          onClick={onSkip}
          tabIndex={0}
          aria-label="No"
          disabled={buttonsDisabled}
        >
          No
        </Button>
      </Stack>
    </Box>
  );
}
import { getRandomIncorrectResponse } from "../utils/incorrectResponses";
import { getRandomCorrectResponse } from "../utils/correctResponses";
import { getRandomAnotherTryResponse } from "../utils/anotherTryResponses";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
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

// ...existing code...


// All hooks must be called before any logic or functions
// (move all useState, useEffect, useRef, etc. here)

// ...existing hooks and state declarations...



const QUESTION_TIME = 30; // seconds
const REVEAL_TIME = 10; // seconds
const QUESTIONS_PER_GAME = 10;

// let globalHookCounter = 0;
export default function QuestionPage({ onEndGame, onQuit, removeWrongAnswers = false, anotherTry = false }) {
  // Ref for answer buttons (for focus management)
  const answerButtonRefs = useRef([]);
  // Ref for Another Try auto-dismiss timeout
  const anotherTryTimeout = useRef(null);
  //
  // --- DO NOT MOVE HOOKS BELOW THIS LINE ---
  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(QUESTION_TIME);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selected, setSelected] = useState(null);
  const [choices, setChoices] = useState([]);
  const [removedIndexes, setRemovedIndexes] = useState([]);
  const [removalTimers, setRemovalTimers] = useState({});
  const [incorrectMsg, setIncorrectMsg] = useState("");
  const [correctMsg, setCorrectMsg] = useState("");
  const timerRef = useRef();
  // Another Try placeholder state
  const [showAnotherTry, setShowAnotherTry] = useState(false);
  // Track which answer indexes should be disabled after a wrong guess with Another Try
  const [disabledIndexes, setDisabledIndexes] = useState([]);
  // Encouraging message for Another Try
  const [anotherTryMsg, setAnotherTryMsg] = useState(getRandomAnotherTryResponse());
  // Track if Another Try has been used for this question
  const [usedAnotherTry, setUsedAnotherTry] = useState(false);
  // Ref for Dismiss button
  const anotherTryDismissRef = useRef(null);
  // Another Try buttons disabled state
  const [anotherTryButtonsDisabled, setAnotherTryButtonsDisabled] = useState(false);
  // Just disabled index for animation
  const [justDisabledIdx, setJustDisabledIdx] = useState(null);

  useEffect(() => {
    if (showAnotherTry && anotherTryDismissRef.current) {
      anotherTryDismissRef.current.focus();
    }
  }, [showAnotherTry]);
  // --- DO NOT ADD HOOKS BELOW THIS LINE ---

  // All variables and logic come after hooks
  // Helper to dismiss the Another Try placeholder
  function dismissAnotherTry() {
    // Guard: do nothing if already dismissed
    if (!showAnotherTry) return;
    setAnotherTryButtonsDisabled(true);
    if (anotherTryTimeout.current) {
      clearTimeout(anotherTryTimeout.current);
      anotherTryTimeout.current = null;
    }
    setShowAnotherTry(false);
    setDisabledIndexes((prev) => {
      if (selected !== null && !prev.includes(selected)) {
        // Focus next enabled answer after disabling
        setTimeout(() => {
          const nextIdx = choices.findIndex(
            (b, idx) => !prev.includes(idx) && idx !== selected
          );
          if (answerButtonRefs.current[nextIdx]) {
            answerButtonRefs.current[nextIdx].focus();
          }
        }, 100);
        return [...prev, selected];
      }
      return prev;
    });
    setSelected(null);
    setUsedAnotherTry(true);
    setJustDisabledIdx(selected);
    setTimeout(() => setJustDisabledIdx(null), 1200);
    setTimeout(() => setAnotherTryButtonsDisabled(false), 500);
  }

  const current = gameQuestions[questionIdx] || {};
  const correctIdx = choices.findIndex((b) => b && b.CommonName === current.CommonName);

  // Debug: log relevant state for Another Try placeholder
  if (typeof window !== 'undefined') {
    console.log('[QuestionPage] Render:', {
      anotherTry,
      showAnotherTry,
      selected,
      correctIdx,
      choicesLength: choices.length,
      removedIndexesLength: removedIndexes.length,
      showAnswer
    });
  }

  // Auto-dismiss Another Try after 7 seconds
  useEffect(() => {
    if (showAnotherTry) {
      setAnotherTryButtonsDisabled(false);
      anotherTryTimeout.current = setTimeout(() => {
        dismissAnotherTry();
      }, 7000);
      return () => {
        if (anotherTryTimeout.current) {
          clearTimeout(anotherTryTimeout.current);
          anotherTryTimeout.current = null;
        }
      };
    }
  }, [showAnotherTry]);


  // All hooks must be called before any return
  useEffect(() => {
    console.log('[QuestionPage] useEffect 1 (fetch birds)');
    fetch("/birds.json")
      .then((res) => res.json())
      .then((data) => {
        setBirds(data.filter((b) => b.CommonName && b.ImageUrl));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log('[QuestionPage] useEffect 2 (set gameQuestions)');
    if (!loading && birds.length > 0) {
      setGameQuestions(shuffle(birds).slice(0, QUESTIONS_PER_GAME));
    }
  }, [loading, birds]);

  useEffect(() => {
    console.log('[QuestionPage] useEffect 3 (set choices)');
    if (gameQuestions.length > 0 && questionIdx < gameQuestions.length) {
      const correct = gameQuestions[questionIdx];
      let incorrect = shuffle(birds.filter((b) => b.CommonName !== correct.CommonName)).slice(0, 3);
      let opts = shuffle([correct, ...incorrect]);
      setChoices(opts);
      setTimer(QUESTION_TIME);
      setShowAnswer(false);
      setSelected(null);
      setDisabledIndexes([]); // Reset disabled indexes for new question
      setUsedAnotherTry(false); // Reset Another Try usage for new question
      setShowAnotherTry(false); // Reset Another Try placeholder for new question
    }
    // eslint-disable-next-line
  }, [gameQuestions, questionIdx, birds]);

  useEffect(() => {
    console.log('[QuestionPage] useEffect 4 (remove wrong answers)');
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

  function removeOneWrong() {
    setRemovedIndexes((prev) => {
      const wrongIndexes = choices
        .map((c, idx) => idx)
        .filter((idx) => idx !== correctIdx && !prev.includes(idx));
      if (wrongIndexes.length === 0) return prev;
      const toRemove = wrongIndexes[Math.floor(Math.random() * wrongIndexes.length)];
      return [...prev, toRemove];
    });
  }

  useEffect(() => {
    console.log('[QuestionPage] useEffect 5 (showAnswer resets removedIndexes)');
    if (showAnswer) setRemovedIndexes([]);
  }, [showAnswer]);

  useEffect(() => {
    console.log('[QuestionPage] useEffect 6 (timer logic)');
    if (showInfo || showAnotherTry) return; // Pause timer in info view or Another Try
    if (showAnswer) {
      if (timer === 0) {
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
  }, [timer, showAnswer, questionIdx, showInfo, showAnotherTry, score, onEndGame]);

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

  // Only now, after all hooks, do the early return
  if (loading || gameQuestions.length === 0) {
    // No hooks can be called after this return!
    return <Typography align="center">Loading...</Typography>;
  }

  // (already declared at top)

  function handleAnswer(idx) {
    console.log('[handleAnswer] called with idx:', idx, {
      showAnswer,
      anotherTry,
      choicesLength: choices.length,
      removedIndexesLength: removedIndexes.length,
      correctIdx,
      isWrong: idx !== correctIdx
    });
    if (showAnswer) return;
    // If Another Try is enabled, more than 2 choices remain, and wrong answer picked
    if (
      anotherTry &&
      choices.length - removedIndexes.length > 2 &&
      idx !== correctIdx
    ) {
      if (!usedAnotherTry && !showAnotherTry) {
        // First wrong guess, show Another Try
        setSelected(idx);
        setIncorrectMsg(getRandomIncorrectResponse());
  setAnotherTryMsg(getRandomAnotherTryResponse());
        // Clear any pending answer removal timers
        Object.values(removalTimers).forEach(clearTimeout);
        setRemovalTimers({});
        setShowAnotherTry(true);
        // setUsedAnotherTry(true); // Now handled in dismissAnotherTry
        return;
      } else {
        // Second wrong guess, show answer as normal
        setSelected(idx);
        setShowAnswer(true);
        setTimer(REVEAL_TIME);
        setIncorrectMsg(getRandomIncorrectResponse());
        setCorrectMsg("");
        return;
      }
    }
    // Normal behavior
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
            alt={current.ScientificName || "Bird"}
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
            <Box sx={{ position: 'relative', width: '100%' }}>
              <Stack spacing={{ xs: 0.7, sm: 1 }} width="100%">
                {choices.map((bird, idx) => {
                  const isRemoved = removedIndexes.includes(idx);
                  const isDisabled = disabledIndexes.includes(idx);
                  return (
                    <Fade in={!isRemoved} key={bird.CommonName} timeout={500}>
                      <div>
                        {isDisabled ? (
                          <Tooltip title="You already tried this answer" arrow>
                            <span>
                              <Button
                                variant={
                                  showAnswer && idx === correctIdx
                                    ? "contained"
                                    : "outlined"
                                }
                                color="warning"
                                onClick={() => handleAnswer(idx)}
                                disabled
                                aria-disabled="true"
                                tabIndex={showAnotherTry ? -1 : -1}
                                sx={{
                                  width: "100%",
                                  fontWeight: 600,
                                  fontSize: 16,
                                  borderRadius: 2,
                                  py: { xs: 0.7, sm: 1.2 },
                                  bgcolor: "#fff8e1",
                                  borderColor: "#ffb300",
                                  opacity: isRemoved ? 0.3 : 1,
                                  textDecoration: isRemoved ? "line-through" : "none",
                                  transition: "opacity 0.5s, background 0.5s",
                                }}
                              >
                                {String.fromCharCode(65 + idx)}: {bird.CommonName}
                              </Button>
                            </span>
                          </Tooltip>
                        ) : (
                          <Button
                            variant={
                              showAnswer && idx === correctIdx
                                ? "contained"
                                : "outlined"
                            }
                            color={
                              showAnswer
                                ? idx === correctIdx
                                  ? "success"
                                  : idx === selected
                                    ? "error"
                                    : "inherit"
                                : "primary"
                            }
                            onClick={() => handleAnswer(idx)}
                            disabled={showAnswer || isRemoved || showAnotherTry}
                            tabIndex={showAnotherTry ? -1 : 0}
                            sx={{
                              width: "100%",
                              fontWeight: 600,
                              fontSize: 16,
                              borderRadius: 2,
                              py: { xs: 0.7, sm: 1.2 },
                              bgcolor:
                                showAnswer && idx === correctIdx
                                  ? "#c8e6c9"
                                  : undefined,
                              borderColor:
                                showAnswer && idx === correctIdx
                                  ? "#388e3c"
                                  : undefined,
                              opacity: isRemoved ? 0.3 : 1,
                              textDecoration: isRemoved ? "line-through" : "none",
                              transition: "opacity 0.5s, background 0.5s",
                              animation: justDisabledIdx === idx ? 'flash 1.2s' : undefined,
                              '@keyframes flash': {
                                '0%': { backgroundColor: '#fffde7' },
                                '50%': { backgroundColor: '#ffe082' },
                                '100%': { backgroundColor: '#fffde7' },
                              },
                            }}
                            ref={el => answerButtonRefs.current[idx] = el}
                          >
                            {String.fromCharCode(65 + idx)}: {bird.CommonName}
                          </Button>
                        )}
                      </div>
                    </Fade>
                  );
                })}
              </Stack>
              {/* Step 1: Show Another Try placeholder message */}
              {showAnotherTry && (
                <AnotherTryPlaceholder
                  message={anotherTryMsg}
                  onDismiss={() => {
                    setAnotherTryButtonsDisabled(true);
                    dismissAnotherTry();
                  }}
                  onSkip={() => {
                    setAnotherTryButtonsDisabled(true);
                    if (anotherTryTimeout.current) {
                      clearTimeout(anotherTryTimeout.current);
                      anotherTryTimeout.current = null;
                    }
                    setShowAnotherTry(false);
                    setShowAnswer(true);
                    setTimer(REVEAL_TIME);
                    setUsedAnotherTry(true);
                    setTimeout(() => setAnotherTryButtonsDisabled(false), 500);
                  }}
                  dismissRef={anotherTryDismissRef}
                  buttonsDisabled={anotherTryButtonsDisabled}
                />
              )}
            </Box>
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
            </>
          )}
      </Stack>
    </CenteredPage>
  );

}
