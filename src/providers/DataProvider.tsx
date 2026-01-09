import { DataInterface } from "@/interfaces/dataInterface";
import { UserInterface } from "@/interfaces/userInterface";
import { apiRoutes } from "@/app/api/apiRoutes";
import { createContext, ReactNode, useState } from "react";

interface DataContextInterface {
  data: DataInterface | null;
  user: UserInterface | null;
  fetchUserData: () => Promise<void>;
  fetchData: () => Promise<void>;
}

const DataContext = createContext<DataContextInterface | undefined>({
  data: null,
  user: null,
  fetchUserData: async () => {},
  fetchData: async () => {},
});

const DataProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(apiRoutes.user);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(apiRoutes.data);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const csvData = await response.json();
      setData(csvData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <DataContext.Provider value={{ data, user, fetchUserData, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
