import React from "react";
import { Box, Paper } from "@mui/material";

export default function CenteredPage({ children, paperSx = {}, shake = false, ...props }) {
  // Add shake keyframes if not present
  if (typeof document !== 'undefined' && !document.getElementById('shake-keyframes')) {
    const style = document.createElement('style');
    style.id = 'shake-keyframes';
    style.innerHTML = `@keyframes shake { 0% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); } 20%, 40%, 60%, 80% { transform: translateX(8px); } 100% { transform: translateX(0); } }`;
    document.head.appendChild(style);
  }
  // Use 100dvh if supported, fallback to 100vh
  const minHeight = typeof window !== 'undefined' && window.CSS && CSS.supports('height: 100dvh') ? '100dvh' : '100vh';
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0f7fa 0%, #a5d6a7 100%)',
        p: 0,
        m: 0,
        zIndex: 0,
        // No overflowY here; let Paper handle it
      }}
      {...props}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: '10px 8px', sm: '24px 32px' },
          borderRadius: { xs: 2, sm: 4 },
          minWidth: 0,
          width: '100%',
          maxWidth: { xs: 360, sm: 420, md: 500 },
          bgcolor: '#f5fff7',
          boxShadow: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: shake ? 'shake 0.7s cubic-bezier(.36,1.7,.5,.87)' : undefined,
          overflowY: { xs: 'auto', sm: 'visible' },
          maxHeight: { xs: '100dvh', sm: 'none' },
          ...paperSx,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
