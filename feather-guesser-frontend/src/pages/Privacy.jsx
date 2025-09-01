import React from "react";
import { Typography, Box, Button, Stack } from "@mui/material";
import CenteredPage from "../components/CenteredPage";

export default function Privacy({ onBack, onPlayNow }) {
  return (
    <CenteredPage>
      <Box sx={{ maxWidth: 500, mx: "auto", p: { xs: 2, sm: 3 }, width: "100%" }}>
        <Typography variant="h5" fontWeight={700} color="#2e7d32" align="center" sx={{ mb: 2 }}>
          Privacy Policy
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          <b>Feather Guesser</b> does not collect or store any personal information from users. This site uses Google AdSense, which may use cookies to serve ads based on your prior visits to this or other websites. <br /><br />
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
      </Box>
    </CenteredPage>
  );
}
