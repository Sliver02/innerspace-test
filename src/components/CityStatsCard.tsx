import {
  Paper,
  Typography,
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  alpha,
} from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import styles from "./CityStatsCard.module.scss";

interface CityStatsCardProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
  avgTemperature: number;
  maxWindSpeed: number;
  totalPrecipitation: number;
}

export default function CityStatsCard({
  cities,
  selectedCity,
  onCityChange,
  avgTemperature,
  maxWindSpeed,
  totalPrecipitation,
}: CityStatsCardProps) {
  return (
    <Paper
      elevation={0}
      className={styles.cityStatsCard}
      sx={{ border: 1, borderColor: "divider" }}
    >
      <Box className={styles.header}>
        <Typography variant="h5" component="h2" className={styles.title}>
          City Statistics
        </Typography>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="city-select-label">City</InputLabel>
          <Select
            labelId="city-select-label"
            id="city-select"
            value={selectedCity}
            label="City"
            onChange={(e) => onCityChange(e.target.value)}
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2} className={styles.statsGrid}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            className={styles.statBox}
            sx={{ bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1) }}
          >
            <ThermostatIcon
              sx={{ fontSize: 40, color: "warning.main", mb: 1 }}
            />
            <Typography variant="h5" className={styles.statValue}>
              {avgTemperature.toFixed(1)}°C
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.statLabel}
            >
              Avg Temperature
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            className={styles.statBox}
            sx={{ bgcolor: (theme) => alpha(theme.palette.info.main, 0.1) }}
          >
            <AirIcon sx={{ fontSize: 40, color: "info.main", mb: 1 }} />
            <Typography variant="h5" className={styles.statValue}>
              {maxWindSpeed.toFixed(1)} km/h
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.statLabel}
            >
              Max Wind Speed
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            className={styles.statBox}
            sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1) }}
          >
            <WaterDropIcon
              sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
            />
            <Typography variant="h5" className={styles.statValue}>
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
