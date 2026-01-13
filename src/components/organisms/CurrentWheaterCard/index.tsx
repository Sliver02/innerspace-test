import { Paper, Typography, Box, Chip } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

interface CurrentWeatherCardProps {
  city: string;
  temperature: number;
  condition: "sunny" | "cloudy" | "foggy";
}

export default function CurrentWeatherCard({
  city,
  temperature,
  condition,
}: CurrentWeatherCardProps) {
  const weatherIcons = {
    sunny: <WbSunnyIcon sx={{ fontSize: 60, color: "#FFA500" }} />,
    cloudy: <CloudIcon sx={{ fontSize: 60, color: "#9E9E9E" }} />,
    foggy: <CloudQueueIcon sx={{ fontSize: 60, color: "#B0BEC5" }} />,
  };

  const weatherColors = {
    sunny: "#FFF3E0",
    cloudy: "#ECEFF1",
    foggy: "#ECEFF1",
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
        Current Weather
      </Typography>
      <Box
        sx={{
          mt: 2,
          p: 3,
          borderRadius: 2,
          bgcolor: weatherColors[condition],
          textAlign: "center",
        }}
      >
        {weatherIcons[condition]}
        <Typography variant="h3" fontWeight="bold" sx={{ mt: 2 }}>
          {temperature}°C
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
          {city}
        </Typography>
        <Chip
          label={condition.charAt(0).toUpperCase() + condition.slice(1)}
          sx={{ mt: 2 }}
          color="primary"
          variant="outlined"
        />
      </Box>
    </Paper>
  );
}
