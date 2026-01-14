"use client";

import { User, useGetUser, WeatherData, useGetWeatherData } from "@/gen/output";
import { parseWeatherCsvData } from "@/utils/dataProcessing";
import { createContext, ReactNode, use } from "react";

interface DataContextInterface {
  userData: User | undefined;
  userLoading: boolean;
  userError: Error | null;
  weatherData: WeatherData[] | undefined;
  weatherDataLoading: boolean;

  weatherError: Error | null;
  refetchUser: () => void;
  refetchWeatherData: () => void;
}

const DataContext = createContext<DataContextInterface | undefined>(undefined);

const DataProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  // Use auto-generated React Query hooks from Orval
  // the first fetch is done thru these hooks

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useGetUser();

  const {
    data: weatherDataCsv,
    isLoading: weatherDataLoading,
    error: weatherError,
    refetch: refetchWeatherData,
  } = useGetWeatherData({
    query: {
      select: (data: string | undefined) => data,
    },
  });

  const weatherData = weatherDataCsv
    ? parseWeatherCsvData(weatherDataCsv)
    : undefined;

  return (
    <DataContext.Provider
      value={{
        userData,
        userLoading,
        userError: userError as Error | null,
        weatherData,
        weatherDataLoading,
        weatherError: weatherError as Error | null,
        refetchUser,
        refetchWeatherData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
