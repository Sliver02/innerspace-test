"use client";

import CityStatsCard from "@/components/organisms/CityStatsCard";
import WelcomeCard from "@/components/molecules/WelcomeCard";
import StatsGrid from "@/components/organisms/StatsGrid";
import { DataContext } from "@/providers/DataProvider";
import { getUniqueCities } from "@/utils/dataProcessing";
import { Alert, Box, CircularProgress, Container } from "@mui/material";
import { useContext, useMemo } from "react";

export default function Home() {
  const {
    userData,
    userLoading,
    userError,
    weatherData,
    weatherDataLoading,
    weatherError,
  } = useContext(DataContext);

  const cities = useMemo(() => {
    if (!weatherData) return [];
    return getUniqueCities(weatherData);
  }, [weatherData]);

  if (userLoading || weatherDataLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (userError || weatherError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          {userError?.message || weatherError?.message || "Error loading data"}
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
        <StatsGrid weatherData={weatherData} totalCities={cities.length} />
      </Box>

      {weatherData && userData && (
        <Box sx={{ mb: 2 }}>
          <CityStatsCard
            weatherData={weatherData}
            userData={userData}
            cities={cities}
          />
        </Box>
      )}
    </Container>
  );
}
