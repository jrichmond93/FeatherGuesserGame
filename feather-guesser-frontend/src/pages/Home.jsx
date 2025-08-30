import { Stack, Button, Typography, IconButton, Box } from "@mui/material";
import CenteredPage from "../components/CenteredPage";
import ShareIcon from "@mui/icons-material/Share";
import React, { useState, useEffect, useRef } from "react";
import featherImg from '/feather.png'; // Vite will resolve this from public

export default function Home({ onHowToPlay, onSettings, onPlayNow }) {
  const [randomBird, setRandomBird] = useState(null);
  const adRef = useRef(null);
  // Share App handler
  const handleShare = async () => {
    const shareData = {
      title: "Feather Guess",
      text: "Try this fun bird guessing game!",
      url: window.location.origin,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(window.location.origin);
      alert("Link copied to clipboard!");
    }
  };

  useEffect(() => {
    fetch("/birds.json")
      .then(res => res.json())
      .then(data => {
        const birdsWithImages = data.filter(b => b.ImageUrl);
        setRandomBird(birdsWithImages[Math.floor(Math.random() * birdsWithImages.length)]);
      });
  }, []);

  // Google AdSense: trigger ad rendering
  useEffect(() => {
    if (window.adsbygoogle && adRef.current) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {}
    }
  }, []);

  return (
    <CenteredPage>
      <Stack spacing={3} alignItems="center" sx={{ boxSizing: 'border-box', width: '100%' }}>
          <Typography variant="h4" fontWeight={700} color="#2e7d32" sx={{ fontSize: { xs: 24, sm: 32 } }}>
            FEATHER GUESS
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ fontSize: { xs: 15, sm: 18 }, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <span>
              Test your bird knowledge <br />Guess the feather!
            </span>
            <img
              src={featherImg}
              alt="Feather"
              style={{ width: 32, height: 32, marginLeft: 8, verticalAlign: 'middle', opacity: 0.85 }}
            />
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#388e3c",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 2,
              width: { xs: "90%", sm: "80%" },
              fontSize: { xs: 17, sm: 20 },
              py: 1.7,
              ':hover': { bgcolor: "#2e7d32" },
              boxShadow: 3,
            }}
            onClick={onPlayNow}
          >
            Play Now
          </Button>
          <Stack direction="row" spacing={2} width="100%" justifyContent="center">
            <Button
              variant="outlined"
              sx={{ flex: 1, fontWeight: 500, borderRadius: 2, fontSize: { xs: 14, sm: 16 } }}
              onClick={onHowToPlay}
            >
              How to Play
            </Button>
            <Button
              variant="outlined"
              sx={{ flex: 1, fontWeight: 500, borderRadius: 2, fontSize: { xs: 14, sm: 16 } }}
              onClick={onSettings}
            >
              Settings
            </Button>
          </Stack>
            <Stack direction="row" spacing={2} alignItems="center" width="100%" justifyContent="center" sx={{ minHeight: 220 }}>
            {randomBird && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
                <Box sx={{ width: 270, height: 220, borderRadius: 3, overflow: 'hidden', boxShadow: 2, bgcolor: '#e0f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={randomBird.ImageUrl} alt={randomBird.CommonName || "Bird"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                {randomBird.CommonName && (
                  <Typography variant="subtitle2" color="text.primary" sx={{ mt: 1, fontWeight: 600, fontSize: 15, textAlign: 'center', maxWidth: 220, wordBreak: 'break-word' }}>
                    {randomBird.CommonName}
                  </Typography>
                )}
                {randomBird.ImageAttribution && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, fontSize: 11, textAlign: 'center', maxWidth: 220, wordBreak: 'break-word' }}>
                    {randomBird.ImageAttribution}
                  </Typography>
                )}
              </Box>
            )}
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ height: 220 }}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mb: 1.5,
                    fontWeight: 500,
                    borderRadius: 2,
                    fontSize: 14,
                    width: 100,
                    height: 60,
                    bgcolor: "#fff",
                    boxShadow: 1,
                    ':hover': { bgcolor: "#e0f7fa" },
                  }}
                  onClick={async () => {
                    const res = await fetch("/birds.json");
                    const data = await res.json();
                    const birdsWithImages = data.filter(b => b.ImageUrl);
                    setRandomBird(birdsWithImages[Math.floor(Math.random() * birdsWithImages.length)]);
                  }}
                >
                  🐦 Next Bird
                </Button>
              <IconButton size="small" color="primary" onClick={handleShare}>
                <ShareIcon fontSize="small" />
              </IconButton>
              <Typography variant="caption" color="text.secondary">
                Share App
              </Typography>
            </Box>
          </Stack>
          {/* Google AdSense Ad Unit */}
          <Box
            mt={2}
            width="100%"
            textAlign="center"
            sx={{ borderTop: "1px solid #e0e0e0", pt: 1 }}
          >
            <ins
              className="adsbygoogle"
              style={{ display: "block", minHeight: 70 }}
              data-ad-client="ca-pub-9566952655833978"
              data-ad-slot="YYYYYYYYYY"
              data-ad-format="auto"
              data-full-width-responsive="true"
              ref={adRef}
            ></ins>
          </Box>
      </Stack>
    </CenteredPage>
  );
}
