import { Paper, Typography, Box, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import styles from "./styles.module.scss";

interface TemperatureChartProps {
  dates: string[];
  temperatures: number[];
}

export default function TemperatureChart({
  dates,
  temperatures,
}: TemperatureChartProps) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      className={styles.chartCard}
      sx={{ border: 1, borderColor: "divider" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <ShowChartIcon sx={{ mr: 1, color: "primary.main" }} />
        <Typography variant="h6" component="h2" className={styles.title}>
          Temperature Trend
        </Typography>
      </Box>
      <Box sx={{ width: "100%", height: 400 }}>
        <LineChart
          xAxis={[
            {
              data: dates.map((_, index) => index),
              scaleType: "point",
              valueFormatter: (value) => dates[value] || "",
            },
          ]}
          series={[
            {
              data: temperatures,
              label: "Temperature (°C)",
              curve: "linear",
              area: true,
              showMark: false,
              color: theme.palette.primary.main,
            },
          ]}
          height={400}
          margin={{ left: 50, right: 20, top: 20, bottom: 60 }}
          grid={{ vertical: true, horizontal: true }}
          sx={{
            "& .MuiAreaElement-root": {
              fill: `url(#temperature-gradient)`,
            },
            "& .MuiLineElement-root": {
              strokeWidth: 2,
            },
          }}
        >
          <defs>
            <linearGradient
              id="temperature-gradient"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0.4}
              />
              <stop
                offset="100%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>
        </LineChart>
      </Box>
    </Paper>
  );
}
