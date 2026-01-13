"use client";

import { useContext, useMemo, useState } from "react";
import { DataContext } from "@/providers/DataProvider";
import { Container, Box, Alert, CircularProgress } from "@mui/material";
import WelcomeCard from "@/components/molecules/WelcomeCard";
import CityStatsCard from "@/components/molecules/CityStatsCard";
import {
  parseCSVData,
  getDateRange,
  getUniqueCities,
  getCityStats,
  getTemperatureOverTime,
} from "@/utils/dataProcessing";
import StatsGrid from "@/components/organisms/StatsGrid";

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

  // Derive the actual city to use (either selected or default if selected is invalid)
  const activeCity = useMemo(() => {
    if (selectedCity && cities.includes(selectedCity)) {
      return selectedCity;
    }
    return defaultCity;
  }, [selectedCity, cities, defaultCity]);

  // Get city-specific data
  const cityStats = useMemo(() => {
    if (!activeCity) return null;
    return getCityStats(weatherData, activeCity);
  }, [weatherData, activeCity]);

  const cityTemperatureData = useMemo(
    () => getTemperatureOverTime(weatherData, activeCity),
    [weatherData, activeCity]
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
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, md: 3 },
        px: { xs: 2, md: 3 },
      }}
    >
      {/* Welcome Section */}
      <Box sx={{ mb: 2 }}>
        <WelcomeCard userName={userData?.name || "Guest"} />
      </Box>

      {/* Summary Statistics */}
      <Box sx={{ mb: 2 }}>
        <StatsGrid
          totalRows={weatherData.length}
          dateRange={dateRange}
          totalCities={cities.length}
        />
      </Box>

      {activeCity && cityStats && (
        <Box sx={{ mb: 2 }}>
          <CityStatsCard
            cities={cities}
            selectedCity={activeCity}
            onCityChange={setSelectedCity}
            avgTemperature={cityStats.avgTemperature}
            maxWindSpeed={cityStats.maxWindSpeed}
            totalPrecipitation={cityStats.totalPrecipitation}
            chartDates={cityTemperatureData.map((d) =>
              d.date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })
            )}
            chartTemperatures={cityTemperatureData.map((d) => d.temperature)}
          />
        </Box>
      )}
    </Container>
  );
}
