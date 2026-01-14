import { Grid } from "@mui/material";
import SummaryCard from "@/components/molecules/SummaryCard";
import TableRowsIcon from "@mui/icons-material/TableRows";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { getDateRange } from "@/utils/dataProcessing";
import { useMemo } from "react";
import { WeatherData } from "@/gen/output";

interface StatsGridProps {
  weatherData: WeatherData[] | undefined;
  totalCities: number;
}

export default function StatsGrid({
  weatherData,
  totalCities,
}: StatsGridProps) {
  const dateRange = useMemo(() => {
    if (!weatherData) return "No data";
    const range = getDateRange(weatherData);
    if (!range) return "No data";
    return `${range.start.toLocaleDateString("en-GB")} - ${range.end.toLocaleDateString("en-GB")}`;
  }, [weatherData]);

  const totalRows = weatherData?.length || 0;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <SummaryCard
          title="Total Data Entries"
          value={totalRows.toLocaleString()}
          icon={<TableRowsIcon sx={{ fontSize: 28 }} />}
          colorVariant="primary"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <SummaryCard
          title="Date Range"
          value={dateRange}
          icon={<CalendarMonthIcon sx={{ fontSize: 28 }} />}
          colorVariant="success"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard
          title="Cities Available"
          value={totalCities}
          icon={<LocationCityIcon sx={{ fontSize: 28 }} />}
          colorVariant="warning"
        />
      </Grid>
    </Grid>
  );
}
