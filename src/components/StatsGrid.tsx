import { Grid } from "@mui/material";
import SummaryCard from "./SummaryCard";
import TableRowsIcon from "@mui/icons-material/TableRows";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationCityIcon from "@mui/icons-material/LocationCity";

interface StatsGridProps {
  totalRows: number;
  dateRange: string;
  totalCities: number;
}

export default function StatsGrid({
  totalRows,
  dateRange,
  totalCities,
}: StatsGridProps) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <SummaryCard
          title="Total Data Entries"
          value={totalRows.toLocaleString()}
          icon={<TableRowsIcon sx={{ fontSize: 28 }} />}
          colorVariant="primary"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <SummaryCard
          title="Date Range"
          value={dateRange}
          icon={<CalendarMonthIcon sx={{ fontSize: 28 }} />}
          colorVariant="success"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
