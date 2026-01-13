import { Paper, Typography, Box, IconButton } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";

interface WelcomeCardProps {
  userName: string;
}

export default function WelcomeCard({ userName }: WelcomeCardProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <WavingHandIcon sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Welcome, {userName}!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
              Here`s your weather dashboard overview
            </Typography>
          </Box>
        </Box>
        <Link href="/userProfile" passHref legacyBehavior>
          <IconButton
            component="a"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.3)",
              },
            }}
            aria-label="View Profile"
          >
            <PersonIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Link>
      </Box>
    </Paper>
  );
}
