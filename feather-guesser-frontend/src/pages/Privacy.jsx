import React from "react";
import { Typography, Box, Button, Stack, Divider } from "@mui/material";
import CenteredPage from "../components/CenteredPage";

export default function Privacy({ onBack, onPlayNow }) {
  return (
    <CenteredPage>
  <Box sx={{ maxWidth: 500, mx: "auto", p: { xs: 2, sm: 3 }, width: "100%", minHeight: '70vh' }}>
        <Typography variant="h5" fontWeight={700} color="#2e7d32" align="center" sx={{ mb: 2 }}>
          Privacy Policy
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          <b>Feather Guesser</b> does not collect or store any personal information from users. This site uses Google AdSense, which may use cookies to serve ads based on your prior visits to this or other websites. (v1.0)<br /><br />
          Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
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
