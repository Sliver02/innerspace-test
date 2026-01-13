import { Paper, Typography, Box } from "@mui/material";
import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

export default function SummaryCard({
  title,
  value,
  icon,
  color = "#1976d2",
}: SummaryCardProps) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: `${color}15`,
            color: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography variant="h4" component="div" fontWeight="bold" gutterBottom>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </Paper>
  );
}
