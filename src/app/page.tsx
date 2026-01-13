"use client";

import { useContext, useMemo, useState } from "react";
import { DataContext } from "@/providers/DataProvider";
import { Container, Box, Alert, CircularProgress } from "@mui/material";
import WelcomeCard from "@/components/WelcomeCard";
import StatsGrid from "@/components/StatsGrid";
import CitySelector from "@/components/CitySelector";
import CityStatsCard from "@/components/CityStatsCard";
import TemperatureChart from "@/components/TemperatureChart";
import {
  parseCSVData,
  getDateRange,
  getUniqueCities,
  getCityStats,
  getTemperatureOverTime,
} from "@/utils/dataProcessing";

export default function Home() {
  const context = useContext(DataContext);

  const { userData, userLoading, userError, csvData, csvLoading, csvError } =
    context || {};

  // Process CSV data
  const weatherData = useMemo(() => {
    if (!csvData) return [];
    return parseCSVData(csvData);
  }, [csvData]);

  // Get summary statistics
  const dateRange = useMemo(() => {
    const range = getDateRange(weatherData);
    if (!range) return "No data";
    return `${range.start.toLocaleDateString()} - ${range.end.toLocaleDateString()}`;
  }, [weatherData]);

  const cities = useMemo(() => getUniqueCities(weatherData), [weatherData]);

  // Set default city to user's hometown if available
  const defaultCity = useMemo(() => {
    if (userData?.hometown && cities.includes(userData.hometown)) {
      return userData.hometown;
    }
    return cities[0] || "";
  }, [userData, cities]);

  const [selectedCity, setSelectedCity] = useState(defaultCity);

  // Get city-specific data
  const cityStats = useMemo(() => {
    if (!selectedCity) return null;
    return getCityStats(weatherData, selectedCity);
  }, [weatherData, selectedCity]);

  const cityTemperatureData = useMemo(
    () => getTemperatureOverTime(weatherData, selectedCity),
    [weatherData, selectedCity]
  );

  if (!context) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Error: DataContext not available</Alert>
      </Container>
    );
  }

  if (userLoading || csvLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (userError || csvError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          {userError?.message || csvError?.message || "Error loading data"}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <WelcomeCard userName={userData?.name || "Guest"} />
      </Box>

      {/* Summary Statistics */}
      <Box sx={{ mb: 4 }}>
        <StatsGrid
          totalRows={weatherData.length}
          dateRange={dateRange}
          totalCities={cities.length}
        />
      </Box>

      {/* City Selection */}
      <Box sx={{ mb: 4 }}>
        <CitySelector
          cities={cities}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />
      </Box>

      {/* City Statistics */}
      {selectedCity && cityStats && (
        <Box sx={{ mb: 4 }}>
          <CityStatsCard
            cityName={selectedCity}
            avgTemperature={cityStats.avgTemperature}
            maxWindSpeed={cityStats.maxWindSpeed}
            totalPrecipitation={cityStats.totalPrecipitation}
          />
        </Box>
      )}

      {/* Temperature Chart */}
      {selectedCity && cityTemperatureData.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <TemperatureChart
            cityName={selectedCity}
            dates={cityTemperatureData.map((d) =>
              d.date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })
            )}
            temperatures={cityTemperatureData.map((d) => d.temperature)}
          />
        </Box>
      )}
    </Container>
  );
}
