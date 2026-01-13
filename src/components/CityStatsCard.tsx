import { Paper, Typography, Box, Grid } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

interface CityStatsCardProps {
  cityName: string;
  avgTemperature: number;
  maxWindSpeed: number;
  totalPrecipitation: number;
}

export default function CityStatsCard({
  cityName,
  avgTemperature,
  maxWindSpeed,
  totalPrecipitation,
}: CityStatsCardProps) {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
        {cityName} Statistics
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "rgba(255, 152, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <ThermostatIcon
              sx={{ fontSize: 40, color: "warning.main", mb: 1 }}
            />
            <Typography variant="h5" fontWeight="bold">
              {avgTemperature.toFixed(1)}°C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Avg Temperature
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "rgba(33, 150, 243, 0.1)",
              textAlign: "center",
            }}
          >
            <AirIcon sx={{ fontSize: 40, color: "info.main", mb: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              {maxWindSpeed.toFixed(1)} km/h
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Max Wind Speed
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "rgba(25, 118, 210, 0.1)",
              textAlign: "center",
            }}
          >
            <WaterDropIcon
              sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
            />
            <Typography variant="h5" fontWeight="bold">
              {totalPrecipitation.toFixed(1)} mm
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Precipitation
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
