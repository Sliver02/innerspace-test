import { Paper, Typography, Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import styles from "./TemperatureChart.module.scss";

interface TemperatureChartProps {
  dates: string[];
  temperatures: number[];
}

export default function TemperatureChart({
  dates,
  temperatures,
}: TemperatureChartProps) {
  return (
    <Paper
      elevation={0}
      className={styles.chartCard}
      sx={{ border: 1, borderColor: "divider" }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ShowChartIcon sx={{ mr: 1, color: "primary.main" }} />
        <Typography variant="h5" component="h2" className={styles.title}>
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
              curve: "natural",
            },
          ]}
          height={400}
          margin={{ left: 50, right: 20, top: 20, bottom: 60 }}
          grid={{ vertical: true, horizontal: true }}
        />
      </Box>
    </Paper>
  );
}
