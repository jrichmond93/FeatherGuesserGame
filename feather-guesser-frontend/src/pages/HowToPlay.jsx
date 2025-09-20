import React from "react";
import { Typography, Stack, Button, Box } from "@mui/material";
import CenteredPage from "../components/CenteredPage";

export default function HowToPlay({ onBack, onPlayNow, onSettings }) {
  return (
    <CenteredPage>
      <Stack spacing={3} sx={{ minHeight: '70vh', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="#2e7d32" align="center">
            How to Play
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <b>Feather Guesser</b> is a fun, educational game to test your bird knowledge!
          </Typography>
          <ol style={{ paddingLeft: 20, color: '#37474f' }}>
            <li>Each game has 10 questions.</li>
            <li>For each question, view a bird image and choose the correct name from the choices.</li>
            <li>If you guess wrong or time runs out, the correct answer is revealed with facts.</li>
            <li>Try to get the highest score! Play again to improve and learn more birds.</li>
          </ol>
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            <span
              style={{ color: '#1976d2', textDecoration: 'underline', cursor: 'pointer' }}
              onClick={onSettings}
              tabIndex={0}
              role="button"
              onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onSettings(); }}
            >
              Settings
            </span>
          </Typography>
          <ul style={{ paddingLeft: 24, color: '#37474f', marginTop: 0 }}>
            <li><b>Flip Mode:</b> Guess the bird image from a description snippet.</li>
            <li><b>Remove Wrong Answers:</b> Incorrect answers will disappear as time elapses.</li>
            <li><b>Another Try:</b> Get a second chance after a wrong answer.</li>
          </ul>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: 1.2 }}>
            <img src="/feather.png" alt="Feather" style={{ maxWidth: 120, width: '100%', opacity: 0.85 }} />
          </Box>
        </Box>
        <Stack direction="row" spacing={2} sx={{ mt: 4, width: '100%' }} justifyContent="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={onBack}
            sx={{
              fontWeight: 600,
              fontSize: 16,
              borderRadius: 2,
              bgcolor: '#b2dfdb',
              flex: 1,
              '&:hover': { bgcolor: '#80cbc4' },
            }}
          >
            Home
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onPlayNow}
            sx={{
              fontWeight: 600,
              fontSize: 16,
              borderRadius: 2,
              bgcolor: '#aed581',
              flex: 1,
              ml: 2,
              '&:hover': { bgcolor: '#7cb342' },
            }}
          >
            Play Now
          </Button>
        </Stack>
      </Stack>
    </CenteredPage>
  );
}
