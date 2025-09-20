import React from "react";
import { Typography, Box, Button, Stack, Divider } from "@mui/material";
import CenteredPage from "../components/CenteredPage";

export default function Terms({ onBack, onPlayNow }) {
  return (
    <CenteredPage>
      <Box sx={{ maxWidth: 500, mx: "auto", p: { xs: 2, sm: 3 }, width: "100%" }}>
        <Typography variant="h5" fontWeight={700} color="#2e7d32" align="center" sx={{ mb: 2 }}>
          Terms of Service
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          By using Feather Guess, you agree to the following terms:
        </Typography>
        <ul style={{ marginTop: 8, marginBottom: 8, color: '#555', fontSize: '1rem' }}>
          <li>This game is for educational and entertainment purposes only.</li>
          <li>No personal data is collected or stored by Feather Guess.</li>
          <li>Third-party services (such as Google AdSense) may use cookies to personalize ads and measure performance.</li>
          <li>All bird images and data are used with permission or are in the public domain. Attribution is provided where required.</li>
          <li>We reserve the right to update these terms at any time.</li>
        </ul>
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
              onClick={() => onBack && onBack("about")}
              tabIndex={0}
              role="button"
              onKeyDown={e => { if ((e.key === "Enter" || e.key === " ") && onBack) onBack("about"); }}
            >
              About
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
