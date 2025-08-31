import React, { useEffect } from "react";
import { Typography, Stack, Button, FormControlLabel, Switch, Box } from "@mui/material";
import CenteredPage from "../components/CenteredPage";

export default function Settings({ mode, onToggleMode, onBack, setPage, currentMode, removeWrongAnswers, onToggleRemoveWrongAnswers, setRemoveWrongAnswers }) {
  // Set default to true on first mount
  useEffect(() => {
    if (removeWrongAnswers === undefined) {
      setRemoveWrongAnswers(true);
    }
  }, [removeWrongAnswers, setRemoveWrongAnswers]);

  return (
    <CenteredPage>
      <Typography variant="h4" fontWeight={700} color="#388e3c" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <b>Game Mode:</b>
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant={mode === "normal" ? "contained" : "outlined"} color="primary" onClick={onToggleMode} sx={{ fontWeight: 600, fontSize: 16, borderRadius: 2 }}>
          Normal
        </Button>
        <Button variant={mode === "reverse" ? "contained" : "outlined"} color="secondary" onClick={onToggleMode} sx={{ fontWeight: 600, fontSize: 16, borderRadius: 2 }}>
          Reverse
        </Button>
      </Stack>
      <Typography variant="body2" sx={{ mb: 3 }}>
        <b>Normal:</b> Guess the bird from the photo.<br />
        <b>Reverse:</b> Guess the correct photo from the bird name.
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={removeWrongAnswers ?? true}
            onChange={onToggleRemoveWrongAnswers}
            color="primary"
          />
        }
        label="Remove Wrong Answers (after 10s & 20s)"
        sx={{ mb: 3 }}
      />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 3 }}>
        <img src="/feather.png" alt="Feather" style={{ maxWidth: 120, width: '100%', opacity: 0.85 }} />
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
          onClick={() => setPage(currentMode === "reverse" ? "reverse-question" : "question")}
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
    </CenteredPage>
  );
}
