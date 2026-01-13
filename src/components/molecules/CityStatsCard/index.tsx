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
  useTheme,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import styles from "./styles.module.scss";

interface CityStatsCardProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
  avgTemperature: number;
  maxWindSpeed: number;
  totalPrecipitation: number;
  chartDates: string[];
  chartTemperatures: number[];
}

export default function CityStatsCard({
  cities,
  selectedCity,
  onCityChange,
  avgTemperature,
  maxWindSpeed,
  totalPrecipitation,
  chartDates,
  chartTemperatures,
}: CityStatsCardProps) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      className={styles.cityStatsCard}
      sx={{ border: 1, borderColor: "divider" }}
    >
      <Box className={styles.header}>
        <Typography
          variant="h6"
          component="h2"
          className={styles.title}
          sx={{ mb: 2 }}
        >
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
        <Grid size={{ xs: 4, sm: 4 }}>
          <Box
            className={styles.statBox}
            sx={{ bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1) }}
          >
            <ThermostatIcon
              sx={{ fontSize: 40, color: "warning.main", mb: 1 }}
            />
            <Typography variant="h4" className={styles.statValue}>
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
        <Grid size={{ xs: 4, sm: 4 }}>
          <Box
            className={styles.statBox}
            sx={{ bgcolor: (theme) => alpha(theme.palette.info.main, 0.1) }}
          >
            <AirIcon sx={{ fontSize: 40, color: "info.main", mb: 1 }} />
            <Typography variant="h4" className={styles.statValue}>
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
        <Grid size={{ xs: 4, sm: 4 }}>
          <Box
            className={styles.statBox}
            sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1) }}
          >
            <WaterDropIcon
              sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
            />
            <Typography variant="h4" className={styles.statValue}>
              {totalPrecipitation.toFixed(1)} mm
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Precipitation
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Temperature Chart */}
      {chartTemperatures.length > 0 && (
        <Box sx={{ width: "100%", height: 400, mt: 3 }}>
          <LineChart
            xAxis={[
              {
                data: chartDates.map((_, index) => index),
                scaleType: "point",
                valueFormatter: (value) => chartDates[value] || "",
              },
            ]}
            series={[
              {
                data: chartTemperatures,
                label: "Temperature (°C)",
                curve: "linear",
                area: true,
                showMark: false,
                color: theme.palette.primary.main,
              },
            ]}
            height={400}
            margin={{ left: 30, right: 20, top: 20, bottom: 60 }}
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
      )}
    </Paper>
  );
}
