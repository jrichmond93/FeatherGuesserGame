import React from "react";
import { Typography, Box, Button, Stack, Divider } from "@mui/material";
import CenteredPage from "../components/CenteredPage";

export default function About({ onBack, onPlayNow }) {
  return (
    <CenteredPage>
      <Box sx={{ maxWidth: 500, mx: "auto", p: { xs: 2, sm: 3 }, width: "100%" }}>
        <Typography variant="h5" fontWeight={700} color="#2e7d32" align="center" sx={{ mb: 2 }}>
          About Feather Guess
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          <b>Feather Guess</b> is a fun, educational game designed to help you learn about birds from around the world. Test your bird knowledge, discover new species, and enjoy beautiful bird photography. Our mission is to make learning about nature engaging and accessible for everyone.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onBack}
            sx={{ fontWeight: 600, borderRadius: 2 }}
          >
            Settings
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={onPlayNow}
            sx={{ fontWeight: 600, borderRadius: 2 }}
          >
            Play Now
          </Button>
        </Stack>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: 1.2 }}>
        <img src="/feather.png" alt="Feather" style={{ maxWidth: 120, width: '100%', opacity: 0.85 }} />
        </Box>
        <Stack direction="row" spacing={2} sx={{ mt: 4, width: '100%', justifyContent: 'center', alignItems: 'center' }} divider={<Divider orientation="vertical" flexItem />}>
          <Typography variant="body2">
            <span
              style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
              onClick={() => onBack && onBack("home")}
              tabIndex={0}
              role="button"
              onKeyDown={e => { if ((e.key === "Enter" || e.key === " ") && onBack) onBack("home"); }}
            >
              Home
            </span>
          </Typography>
          <Typography variant="body2">
            <span
              style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
              onClick={() => onBack && onBack("privacy")}
              tabIndex={0}
              role="button"
              onKeyDown={e => { if ((e.key === "Enter" || e.key === " ") && onBack) onBack("privacy"); }}
            >
              Privacy Policy
            </span>
          </Typography>
          <Typography variant="body2">
            <span
              style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
              onClick={() => onBack && onBack("terms")}
              tabIndex={0}
              role="button"
              onKeyDown={e => { if ((e.key === "Enter" || e.key === " ") && onBack) onBack("terms"); }}
            >
              Terms of Service
            </span>
          </Typography>
          <Typography variant="body2">
            <span
              style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
              onClick={() => onBack && onBack("contact")}
              tabIndex={0}
              role="button"
              onKeyDown={e => { if ((e.key === "Enter" || e.key === " ") && onBack) onBack("contact"); }}
            >
              Contact
            </span>
          </Typography>
        </Stack>
      </Box>
    </CenteredPage>
  );
}
