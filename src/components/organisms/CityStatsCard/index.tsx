import StatCard from "@/components/molecules/StatCard";
import { User, WeatherData } from "@/gen/output";
import { getCityStats, getTemperatureOverTime } from "@/utils/dataProcessing";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useMemo, useState } from "react";
import styles from "./styles.module.scss";
import TemperatureChart from "@/components/molecules/TemperatureChart";

interface CityStatsCardProps {
  weatherData: WeatherData[];
  userData: User;
  cities: string[];
}

export default function CityStatsCard({
  weatherData,
  userData,
  cities,
}: CityStatsCardProps) {
  const theme = useTheme();

  // Set default city to user's hometown if available
  const defaultCity = useMemo(() => {
    if (userData?.hometown && cities.includes(userData.hometown)) {
      return userData.hometown;
    }
    return cities[0] || "";
  }, [userData, cities]);

  const [selectedCity, setSelectedCity] = useState(defaultCity);

  // Derive the actual city to use (either selected or default if selected is invalid)
  const activeCity = useMemo(() => {
    if (selectedCity && cities.includes(selectedCity)) {
      return selectedCity;
    }
    return defaultCity;
  }, [selectedCity, cities, defaultCity]);

  // Get city-specific data
  const cityStats = useMemo(() => {
    return getCityStats(weatherData, activeCity);
  }, [weatherData, activeCity]);

  const cityTemperatureData = useMemo(() => {
    if (!activeCity || !weatherData) return [];
    return getTemperatureOverTime(weatherData, activeCity);
  }, [weatherData, activeCity]);

  const chartDates = cityTemperatureData.map((d) =>
    d.date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })
  );

  const chartTemperatures = cityTemperatureData.map((d) => d.temperature);

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
            onChange={(e) => setSelectedCity(e.target.value)}
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
          <StatCard
            title={`${cityStats?.avgTemperature}°C`}
            label="Avg Temperature"
            icon={
              <ThermostatIcon
                sx={{ fontSize: 40, color: "warning.main", mb: 1 }}
              />
            }
            bgcolor={alpha(theme.palette.warning.main, 0.1)}
          />
        </Grid>
        <Grid size={{ xs: 4, sm: 4 }}>
          <StatCard
            title={`${cityStats?.maxWindSpeed} km/h`}
            label="Max Wind Speed"
            icon={<AirIcon sx={{ fontSize: 40, color: "info.main", mb: 1 }} />}
            bgcolor={alpha(theme.palette.info.main, 0.1)}
          />
        </Grid>
        <Grid size={{ xs: 4, sm: 4 }}>
          <StatCard
            title={`${cityStats?.totalPrecipitation} mm`}
            label="Total Precipitation"
            icon={
              <WaterDropIcon
                sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
              />
            }
            bgcolor={alpha(theme.palette.primary.main, 0.1)}
          />
        </Grid>
      </Grid>

      {/* Temperature Chart */}
      {chartTemperatures.length > 0 && (
        <Box sx={{ width: "100%", height: 400, mt: 3 }}>
          <TemperatureChart
            dates={chartDates}
            temperatures={chartTemperatures}
          />
        </Box>
      )}
    </Paper>
  );
}
