"use client";

import { useContext } from "react";
import { DataContext } from "@/providers/DataProvider";
import {
  Container,
  Grid,
  Box,
  Alert,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import ProfileImage from "@/components/ProfileImage";
import UserInfoGrid from "@/components/UserInfoGrid";

export default function UserProfile() {
  const context = useContext(DataContext);

  const { userData, userLoading, userError } = context || {};

  if (!context) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Error: DataContext not available</Alert>
      </Container>
    );
  }

  if (userLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (userError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          {userError?.message || "Error loading user data"}
        </Alert>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">No user data available</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Left Column - Profile Image and Name */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Box sx={{ position: "sticky", top: 20 }}>
            <ProfileImage user={userData} imageUrl="" />
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
              <Typography variant="h5" component="h1" fontWeight="bold">
                {userData.name} {userData.surname}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {userData.job}
              </Typography>
            </Paper>
          </Box>
        </Grid>

        {/* Right Column - User Information */}
        <Grid size={{ xs: 12, md: 9 }}>
          <UserInfoGrid userData={userData} />
        </Grid>
      </Grid>
    </Container>
  );
}
