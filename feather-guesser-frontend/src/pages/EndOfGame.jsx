
import React, { useEffect, useRef } from "react";
import { Typography, Button, Stack } from "@mui/material";
import CenteredPage from "../components/CenteredPage";

// Simple burst animation for emojis
const burstStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
  marginBottom: 8,
};

const emojiAnim = {
  animation: 'burst 0.8s cubic-bezier(.36,1.7,.5,.87)',
  display: 'inline-block',
};

// Add keyframes for burst
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
@keyframes burst {
  0% { opacity: 0; transform: scale(0.2) rotate(-30deg); }
  60% { opacity: 1; transform: scale(1.2) rotate(10deg); }
  80% { transform: scale(0.95) rotate(-5deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}`;
if (!document.getElementById('burst-keyframes')) {
  styleSheet.id = 'burst-keyframes';
  document.head.appendChild(styleSheet);
}

const CELEBRATIONS = [
  "🎉", "🎊", "✨", "🥳", "🎈", "🌟"
];

function getMessage(score) {
  if (score <= 3) return "Keep practicing! You'll get better with each game.";
  if (score <= 5) return "Good job! You're getting the hang of it.";
  if (score <= 8) return "Very good! You know your birds!";
  if (score === 9) return "Awesome! Almost perfect!";
  return "Wow! You are totally awesome!";
}

export default function EndOfGame({ score, maxScore, onPlayAgain, onHome }) {
  const timerRef = useRef();
  // Auto-restart after 30s
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      onPlayAgain();
    }, 30000);
    return () => clearTimeout(timerRef.current);
  }, [onPlayAgain]);

  const shake = score >= 8;
  return (
    <CenteredPage shake={shake}>
      <Stack spacing={2} alignItems="center" sx={{ width: '100%', textAlign: 'center' }}>
        {score > 5 ? (
          <span style={{ ...burstStyle, fontSize: 48 }}>
            {CELEBRATIONS.map((c, i) => (
              <span key={i} style={emojiAnim}>{c}</span>
            ))}
          </span>
        ) : (
          <span style={{ fontSize: 48, marginBottom: 8 }}>
            {CELEBRATIONS.map((c, i) => <span key={i}>{c}</span>)}
          </span>
        )}
        <Typography variant="h4" fontWeight={700} color="#388e3c" gutterBottom>
          Game Over!
        </Typography>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
          Score: {score} / {maxScore}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontSize: 18 }}>
          {getMessage(score)}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" color="primary" onClick={onPlayAgain} sx={{ fontWeight: 600, fontSize: 16, borderRadius: 2 }}>
            Play Again
          </Button>
          <Button variant="outlined" color="secondary" onClick={onHome} sx={{ fontWeight: 600, fontSize: 16, borderRadius: 2 }}>
            Home
          </Button>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
          (Auto-restart in 30 seconds)
        </Typography>
        <Box
          mt={2}
          width="100%"
          textAlign="center"
          sx={{ borderTop: "1px solid #e0e0e0", pt: 1 }}
        >
          <Typography variant="caption" color="text.disabled">
            Ad
          </Typography>
        </Box>
      </Stack>
    </CenteredPage>
  );
}
