import { Paper, Typography, Box, alpha } from "@mui/material";
import { ReactNode } from "react";
import styles from "./SummaryCard.module.scss";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  colorVariant?: "primary" | "success" | "warning" | "error" | "info";
}

export default function SummaryCard({
  title,
  value,
  icon,
  colorVariant = "primary",
}: SummaryCardProps) {
  return (
    <Paper
      elevation={0}
      className={styles.summaryCard}
      sx={{ border: 1, borderColor: "divider" }}
    >
      <Box
        className={styles.icon}
        sx={(theme) => ({
          bgcolor: alpha(theme.palette[colorVariant].main, 0.1),
          color: theme.palette[colorVariant].main,
        })}
      >
        {icon}
      </Box>
      <Typography
        variant="h4"
        component="div"
        className={styles.value}
        gutterBottom
      >
        {value}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        className={styles.label}
      >
        {title}
      </Typography>
    </Paper>
  );
}
