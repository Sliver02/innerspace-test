import { Paper, Typography, Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";

interface TemperatureChartProps {
  cityName: string;
  dates: string[];
  temperatures: number[];
}

export default function TemperatureChart({
  cityName,
  dates,
  temperatures,
}: TemperatureChartProps) {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <ShowChartIcon sx={{ mr: 1, color: "primary.main" }} />
        <Typography variant="h5" component="h2" fontWeight="bold">
          Temperature Trend - {cityName}
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
              color: "#1976d2",
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
