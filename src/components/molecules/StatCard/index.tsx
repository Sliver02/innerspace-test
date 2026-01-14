import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

export interface StatCardProps {
  title: string;
  label: string;
  icon: ReactNode;
  bgcolor?: string;
}

const StatCard = ({ title, label, icon, bgcolor }: StatCardProps) => {
  return (
    <Box className={styles.statCard} sx={{ bgcolor }}>
      {icon}
      <Typography variant="h4" className={styles.statValue}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        className={styles.statLabel}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default StatCard;
