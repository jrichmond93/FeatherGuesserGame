
import React, { useState } from "react";
import { Box, Typography, MenuItem, Select, FormControl, InputLabel, Paper, Divider } from "@mui/material";
import CenteredPage from "../components/CenteredPage";
import facts from "../utils/didyouknow.js";

export default function DidYouKnow({ onBack }) {
  const [selected, setSelected] = useState("");
  // facts is now directly imported as an array
  const fact = facts.find(f => f.label === selected);

  return (
    <CenteredPage>
  <Box sx={{ maxWidth: 500, mx: "auto", width: "100%", p: { xs: 2, sm: 3 }, minHeight: '70vh' }}>
        <Typography variant="h5" fontWeight={700} color="#2e7d32" align="center" sx={{ mb: 2 }}>
          Did You Know?
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="didyouknow-select-label">Select a Fun Fact</InputLabel>
          <Select
            labelId="didyouknow-select-label"
            value={selected}
            label="Select a Fun Fact"
            onChange={e => setSelected(e.target.value)}
          >
            {facts.map(f => (
              <MenuItem key={f.label} value={f.label}>{f.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {fact && (
          <Paper elevation={2} sx={{ p: 2, bgcolor: '#f9fff7', mb: 2 }}>
            <Typography variant="h6" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
              {fact.question}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontSize: 17 }}>
              {fact.answer}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 15 }}>
              {fact.narrative}
            </Typography>
          </Paper>
        )}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: 1.2 }}>
            <img src="/feather.png" alt="Feather" style={{ maxWidth: 120, width: '100%', opacity: 0.85 }} />
        </Box>
        {/* Footer links */}
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
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
          </Box>
        </Box>
      </Box>
    </CenteredPage>
  );
}
