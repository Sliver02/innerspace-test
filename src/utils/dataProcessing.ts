import { WeatherData } from "@/gen/output";

export function parseCSVData(csvData: string): WeatherData[] {
  const lines = csvData.trim().split("\n");
  if (lines.length <= 1) return [];

  const rows = lines.slice(1);

  return rows.map((line) => {
    const values = line.split(",");
    return {
      date: values[0],
      city: values[1],
      temperature_c: parseFloat(values[2]),
      humidity: parseFloat(values[3]),
      precip_mm: parseFloat(values[4]),
      wind_kph: parseFloat(values[5]),
    };
  });
}

export function getUniqueCities(data: WeatherData[]): string[] {
  const cities = new Set(data.map((d) => d.city));
  return Array.from(cities).sort();
}

export function getDateRange(data: WeatherData[]): {
  start: Date;
  end: Date;
} | null {
  if (data.length === 0) return null;

  const dates = data.map((d) => new Date(d.date));
  return {
    start: new Date(Math.min(...dates.map((d) => d.getTime()))),
    end: new Date(Math.max(...dates.map((d) => d.getTime()))),
  };
}

export function getCityStats(data: WeatherData[], city: string) {
  const cityData = data.filter(
    (d) => d.city.toLowerCase() === city.toLowerCase()
  );

  if (cityData.length === 0) {
    return null;
  }

  const avgTemperature =
    cityData.reduce((sum, d) => sum + d.temperature_c, 0) / cityData.length;
  const maxWindSpeed = Math.max(...cityData.map((d) => d.wind_kph));
  const totalPrecipitation = cityData.reduce((sum, d) => sum + d.precip_mm, 0);

  return {
    avgTemperature: parseFloat(avgTemperature.toFixed(1)),
    maxWindSpeed: parseFloat(maxWindSpeed.toFixed(1)),
    totalPrecipitation: parseFloat(totalPrecipitation.toFixed(1)),
    dataPoints: cityData.length,
  };
}

export function getTemperatureOverTime(data: WeatherData[], city: string) {
  return data
    .filter((d) => d.city.toLowerCase() === city.toLowerCase())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((d) => ({
      date: new Date(d.date),
      temperature: d.temperature_c,
    }));
}

export function getRandomWeather(): {
  temperature: number;
  condition: string;
} {
  const conditions = ["Sunny", "Cloudy", "Foggy", "Rainy", "Partly Cloudy"];
  const randomTemp = Math.floor(Math.random() * 25) + 5; // 5-30°C
  const randomCondition =
    conditions[Math.floor(Math.random() * conditions.length)];

  return {
    temperature: randomTemp,
    condition: randomCondition,
  };
}
