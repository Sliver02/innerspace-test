import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/designSystem/globals.scss";
import { DataProvider } from "@/providers/DataProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import Header from "@/components/organisms/Header";
import { Box } from "@mui/material";
import AppTheme from "@/theme/AppTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeatherDash",
  description: "Your personal weather dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppTheme>
          <QueryProvider>
            <DataProvider>
              <Header />
              <Box component="main" sx={{ pt: 8 }}>
                {children}
              </Box>
            </DataProvider>
          </QueryProvider>
        </AppTheme>
      </body>
    </html>
  );
}
