"use client";

import { useContext } from "react";
import { DataContext } from "@/providers/DataProvider";
import styles from "./page.module.css";

export default function Home() {
  const context = useContext(DataContext);

  if (!context) {
    return <div>Error: DataContext not available</div>;
  }

  const {
    userData,
    userLoading,
    userError,
    csvData,
    csvLoading,
    csvError,
    refetchUser,
    refetchData,
  } = context;

  return (
    <div className={styles.page}>
      <main className={styles.main} style={{ color: "#000" }}>
        <h1 style={{ color: "#000" }}>API Endpoints Test</h1>

        {/* User Endpoint Test */}
        <section style={{ marginBottom: "3rem", width: "100%", color: "#000" }}>
          <h2 style={{ color: "#000" }}>🧑 User Endpoint (/api/user)</h2>
          <button
            onClick={() => refetchUser()}
            style={{
              marginBottom: "1rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              background: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Refetch User
          </button>

          {userLoading && (
            <p style={{ color: "#000" }}>⏳ Loading user data...</p>
          )}

          {userError && (
            <div style={{ color: "red" }}>
              <p>❌ Error: {userError.message}</p>
            </div>
          )}

          {userData && !userLoading && (
            <div
              style={{
                background: "#f5f5f5",
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "left",
                color: "#000",
              }}
            >
              <h3 style={{ color: "#000" }}>✅ User Data:</h3>
              <pre style={{ color: "#000" }}>
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>
          )}
        </section>

        {/* Data Endpoint Test */}
        <section style={{ width: "100%", color: "#000" }}>
          <h2 style={{ color: "#000" }}>📊 Data Endpoint (/api/data)</h2>
          <button
            onClick={() => refetchData()}
            style={{
              marginBottom: "1rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              background: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Refetch Data
          </button>

          {csvLoading && (
            <p style={{ color: "#000" }}>⏳ Loading CSV data...</p>
          )}

          {csvError && (
            <div style={{ color: "red" }}>
              <p>❌ Error: {csvError.message}</p>
            </div>
          )}

          {csvData && !csvLoading && (
            <div
              style={{
                background: "#f5f5f5",
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "left",
                color: "#000",
              }}
            >
              <h3 style={{ color: "#000" }}>✅ CSV Data:</h3>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "0.85rem",
                  color: "#000",
                }}
              >
                {csvData}
              </pre>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
