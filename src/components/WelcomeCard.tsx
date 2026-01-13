import { Paper, Typography, Box, IconButton, alpha } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import styles from "./WelcomeCard.module.scss";

interface WelcomeCardProps {
  userName: string;
}

export default function WelcomeCard({ userName }: WelcomeCardProps) {
  return (
    <Paper
      elevation={0}
      className={styles.welcomeCard}
      sx={(theme) => ({
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
        color: theme.palette.primary.contrastText,
      })}
    >
      <Box className={styles.content}>
        <Box className={styles.leftSection}>
          <WavingHandIcon className={styles.icon} />
          <Box>
            <Typography variant="h4" component="h1" className={styles.title}>
              Welcome, {userName}!
            </Typography>
            <Typography variant="body1" className={styles.subtitle}>
              Here&apos;s your weather dashboard overview
            </Typography>
          </Box>
        </Box>
        <Link href="/userProfile" passHref legacyBehavior>
          <IconButton
            component="a"
            className={styles.profileButton}
            sx={(theme) => ({
              bgcolor: alpha(theme.palette.primary.contrastText, 0.2),
              color: theme.palette.primary.contrastText,
            })}
            aria-label="View Profile"
          >
            <PersonIcon />
          </IconButton>
        </Link>
      </Box>
    </Paper>
  );
}
