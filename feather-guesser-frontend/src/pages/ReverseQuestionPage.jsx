import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  Stack,
  Button,
  LinearProgress,
  CardMedia,
  Box,
} from "@mui/material";
import CenteredPage from "../components/CenteredPage";

function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const QUESTION_TIME = 20;
const REVEAL_TIME = 8;
const QUESTIONS_PER_GAME = 10;

export default function ReverseQuestionPage({ onEndGame, onQuit }) {
  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(QUESTION_TIME);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState(null);
  const [choices, setChoices] = useState([]);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    fetch("/birds.json")
      .then((res) => res.json())
      .then((data) => {
        setBirds(data.filter(b => b.CommonName && b.ImageUrl));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && birds.length > 0) {
      setGameQuestions(shuffle(birds).slice(0, QUESTIONS_PER_GAME));
    }
  }, [loading, birds]);

  useEffect(() => {
    if (gameQuestions.length > 0 && questionIdx < gameQuestions.length) {
      const correct = gameQuestions[questionIdx];
      let incorrect = shuffle(birds.filter(b => b.CommonName !== correct.CommonName)).slice(0, 3);
      let opts = shuffle([correct, ...incorrect]);
      setChoices(opts);
      setTimer(QUESTION_TIME);
      setShowAnswer(false);
      setSelected(null);
    }
  }, [gameQuestions, questionIdx, birds]);

  useEffect(() => {
    if (showInfo) return;
    if (showAnswer) {
      if (timer === 0) {
        if (questionIdx < QUESTIONS_PER_GAME - 1) {
          setQuestionIdx(q => q + 1);
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
    timerRef.current = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timer, showAnswer, questionIdx, showInfo, score, onEndGame]);

  function handleNext() {
    setShowInfo(false);
    if (questionIdx < QUESTIONS_PER_GAME - 1) {
      setQuestionIdx(q => q + 1);
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
  const correctIdx = choices.findIndex(b => b.CommonName === current.CommonName);

  function handleAnswer(idx) {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    setTimer(REVEAL_TIME);
    if (idx === correctIdx) setScore(s => s + 1);
  }

  return (
    <CenteredPage>
      <Box sx={{ position: 'fixed', top: 16, right: 24, zIndex: 10 }}>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => onQuit && onQuit()}
          sx={{ minWidth: 0, px: 1.5, fontSize: 13, fontWeight: 500, borderRadius: 2 }}
        >
          Quit
        </Button>
      </Box>
      <Stack spacing={2} alignItems="center" sx={{ width: '100%' }}>
        <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">Question {questionIdx + 1}.{QUESTIONS_PER_GAME}</Typography>
          <Typography variant="subtitle2" fontWeight={700}>{score * 100}</Typography>
        </Stack>
        <Typography variant="h5" fontWeight={700} color="#1976d2" align="center" sx={{ mb: 1 }}>
          {current.CommonName}
        </Typography>
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
            <Box width="100%">
              <LinearProgress
                variant="determinate"
                value={showAnswer ? 100 : (timer / QUESTION_TIME) * 100}
                sx={{ height: 10, borderRadius: 5, mb: 1, bgcolor: "#e0f2f1", '& .MuiLinearProgress-bar': { bgcolor: showAnswer ? (selected === correctIdx ? "#388e3c" : "#d32f2f") : "#388e3c" } }}
              />
              <Typography align="center" fontWeight={600} color={showAnswer ? (selected === correctIdx ? "#388e3c" : "#d32f2f") : "#2e7d32"}>
                {showAnswer ? (selected === null ? "Time's up!" : selected === correctIdx ? "Correct!" : "Incorrect") : `${timer} seconds`}
              </Typography>
            </Box>
            <Box width="100%" sx={{ mt: 2 }}>
              <Stack direction="row" spacing={2} width="100%" justifyContent="center" alignItems="center">
                {choices.slice(0,2).map((bird, idx) => (
                  <Button
                    key={bird.ImageUrl}
                    onClick={() => handleAnswer(idx)}
                    disabled={showAnswer}
                    sx={{
                      p: 0,
                      border: showAnswer ? (idx === correctIdx ? "2px solid #388e3c" : idx === selected ? "2px solid #d32f2f" : "2px solid #e0e0e0") : "2px solid #e0e0e0",
                      borderRadius: 3,
                      overflow: 'hidden',
                      minWidth: 0,
                      width: { xs: 140, sm: 180 },
                      height: { xs: 120, sm: 150 },
                      boxShadow: showAnswer && idx === correctIdx ? 6 : 2,
                      bgcolor: showAnswer && idx === correctIdx ? "#c8e6c9" : undefined,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={bird.ImageUrl}
                      alt={bird.CommonName}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                      }}
                    />
                  </Button>
                ))}
              </Stack>
              <Stack direction="row" spacing={2} width="100%" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                {choices.slice(2,4).map((bird, idx) => (
                  <Button
                    key={bird.ImageUrl}
                    onClick={() => handleAnswer(idx+2)}
                    disabled={showAnswer}
                    sx={{
                      p: 0,
                      border: showAnswer ? ((idx+2) === correctIdx ? "2px solid #388e3c" : (idx+2) === selected ? "2px solid #d32f2f" : "2px solid #e0e0e0") : "2px solid #e0e0e0",
                      borderRadius: 3,
                      overflow: 'hidden',
                      minWidth: 0,
                      width: { xs: 140, sm: 180 },
                      height: { xs: 120, sm: 150 },
                      boxShadow: showAnswer && (idx+2) === correctIdx ? 6 : 2,
                      bgcolor: showAnswer && (idx+2) === correctIdx ? "#c8e6c9" : undefined,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={bird.ImageUrl}
                      alt={bird.CommonName}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                      }}
                    />
                  </Button>
                ))}
              </Stack>
            </Box>
            <Stack direction="row" spacing={2} width="100%" sx={{ mt: 2, minHeight: 48 }}>
              {showAnswer && timer > 0 ? (
                <>
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
                </>
              ) : (
                <>
                  <Box sx={{ flex: 1, height: 40, visibility: 'hidden' }}><Button sx={{ width: '100%', height: 40 }} /></Box>
                  <Box sx={{ flex: 1, height: 40, visibility: 'hidden' }}><Button sx={{ width: '100%', height: 40 }} /></Box>
                </>
              )}
            </Stack>
          </>
        )}
      </Stack>
    </CenteredPage>
  );
}
