"use client";

import { User, useGetUser, useGetData } from "@/gen/output";
import { createContext, ReactNode } from "react";

interface DataContextInterface {
  userData: User | undefined;
  userLoading: boolean;
  userError: Error | null;
  csvData: string | undefined;
  csvLoading: boolean;
  csvError: Error | null;
  refetchUser: () => void;
  refetchData: () => void;
}

const DataContext = createContext<DataContextInterface | undefined>(undefined);

const DataProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  // Use auto-generated React Query hooks from Orval
  const {
    data: userResponse,
    isLoading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useGetUser();
  const {
    data: csvResponse,
    isLoading: csvLoading,
    error: csvError,
    refetch: refetchData,
  } = useGetData();

  // Extract data from responses - only use successful responses
  const userData = userResponse?.status === 200 ? userResponse.data : undefined;
  const csvData = csvResponse?.status === 200 ? csvResponse.data : undefined;

  return (
    <DataContext.Provider
      value={{
        userData,
        userLoading,
        userError: userError as Error | null,
        csvData,
        csvLoading,
        csvError: csvError as Error | null,
        refetchUser,
        refetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
