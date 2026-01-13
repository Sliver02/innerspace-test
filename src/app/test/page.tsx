"use client";

import { useContext, useMemo } from "react";
import { DataContext } from "@/providers/DataProvider";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonIcon from "@mui/icons-material/Person";
import DatasetIcon from "@mui/icons-material/Dataset";

export default function Home() {
  const context = useContext(DataContext);

  const {
    userData,
    userLoading,
    userError,
    csvData,
    csvLoading,
    csvError,
    refetchUser,
    refetchData,
  } = context || {};

  // Parse CSV data into table format
  const csvTableData = useMemo(() => {
    if (!csvData) return { headers: [], rows: [] };

    const lines = csvData.trim().split("\n");
    if (lines.length === 0) return { headers: [], rows: [] };

    const headers = lines[0].split(",");
    const rows = lines.slice(1).map((line) => line.split(","));

    return { headers, rows };
  }, [csvData]);

  // Convert user object to table format
  const userTableData = useMemo(() => {
    if (!userData) return [];

    return Object.entries(userData).map(([key, value]) => ({
      property: key,
      value: String(value),
    }));
  }, [userData]);

  if (!context) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Error: DataContext not available</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          API Endpoints Test
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Paper variant="outlined" sx={{ p: 3, height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <DatasetIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h5" component="h2">
                Data Endpoint
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              /api/data
            </Typography>

            <Box sx={{ my: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<RefreshIcon />}
                onClick={() => refetchData?.()}
                disabled={csvLoading}
                fullWidth
              >
                Refetch Data
              </Button>
            </Box>

            {csvLoading && (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, my: 2 }}
              >
                <CircularProgress size={20} />
                <Typography variant="body2">Loading CSV data...</Typography>
              </Box>
            )}

            {csvError && (
              <Alert variant="outlined" severity="error" sx={{ my: 2 }}>
                {csvError.message}
              </Alert>
            )}

            {csvData && !csvLoading && (
              <Box sx={{ mt: 2 }}>
                <Alert variant="outlined" severity="success" sx={{ mb: 2 }}>
                  CSV Data Retrieved ({csvTableData.rows.length} entries)
                </Alert>
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ maxHeight: 400 }}
                >
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        {csvTableData.headers.map((header, index) => (
                          <TableCell
                            key={index}
                            sx={{
                              fontWeight: "bold",
                              bgcolor: "grey.100",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {csvTableData.rows.map((row, rowIndex) => (
                        <TableRow
                          key={rowIndex}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            "&:hover": { bgcolor: "grey.50" },
                          }}
                        >
                          {row.map((cell, cellIndex) => (
                            <TableCell key={cellIndex}>{cell}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper variant="outlined" sx={{ p: 3, height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PersonIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h5" component="h2">
                User Endpoint
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              /api/user
            </Typography>

            <Box sx={{ my: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={() => refetchUser?.()}
                disabled={userLoading}
                fullWidth
              >
                Refetch User
              </Button>
            </Box>

            {userLoading && (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, my: 2 }}
              >
                <CircularProgress size={20} />
                <Typography variant="body2">Loading user data...</Typography>
              </Box>
            )}

            {userError && (
              <Alert variant="outlined" severity="error" sx={{ my: 2 }}>
                {userError.message}
              </Alert>
            )}

            {userData && !userLoading && (
              <Box sx={{ mt: 2 }}>
                <Alert variant="outlined" severity="success" sx={{ mb: 2 }}>
                  User Data Retrieved
                </Alert>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ fontWeight: "bold", bgcolor: "grey.100" }}
                        >
                          Property
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", bgcolor: "grey.100" }}
                        >
                          Value
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userTableData.map((row) => (
                        <TableRow
                          key={row.property}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: 500 }}
                          >
                            {row.property}
                          </TableCell>
                          <TableCell>{row.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
