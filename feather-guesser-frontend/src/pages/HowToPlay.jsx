import React from "react";
import { Typography, Stack, Button, Box } from "@mui/material";
import CenteredPage from "../components/CenteredPage";

export default function HowToPlay({ onBack, onPlayNow }) {
  return (
    <CenteredPage>
      <Stack spacing={3} sx={{ minHeight: '80vh', justifyContent: 'space-between' }}>
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
            <li>If you guess wrong or time runs out, the correct answer is revealed with facts and info.</li>
            <li>Try to get the highest score! Play again to improve and learn more birds.</li>
            <li>Reverse Mode: Guess the bird image from a description snippet.</li>
            <li>Remove Wrong Answers: One incorrect option will disappear after 10 seconds, and another after 20 seconds.</li>
          </ol>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: 3 }}>
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
            Back
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
