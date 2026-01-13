"use client";

import { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  alpha,
} from "@mui/material";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import { DataContext } from "@/providers/DataProvider";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.scss";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const context = useContext(DataContext);
  const { userData } = context || {};

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getInitials = (name?: string, surname?: string) => {
    if (!name && !surname) return "U";
    return `${name?.[0] || ""}${surname?.[0] || ""}`.toUpperCase();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className={styles.appBar}
      sx={(theme) => ({
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        borderColor: "divider",
      })}
    >
      <Toolbar className={styles.toolbar}>
        {/* Logo/Project Name */}
        <Link href="/" passHref legacyBehavior>
          <Box
            component="a"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={(theme) => ({
                fontWeight: "bold",
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              })}
            >
              WeatherDash
            </Typography>
          </Box>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        {/* Theme Toggle & User Profile */}
        <Box className={styles.userSection}>
          <ThemeToggle />

          {userData && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                }}
                onClick={handleMenuOpen}
              >
                <Typography
                  variant="body1"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  {userData.name} {userData.surname}
                </Typography>
                <Avatar
                  className={styles.avatar}
                  sx={{
                    bgcolor: "primary.main",
                    width: 36,
                    height: 36,
                  }}
                >
                  {getInitials(userData.name, userData.surname)}
                </Avatar>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    minWidth: 250,
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {userData.name} {userData.surname}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {userData.job}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <EmailIcon
                      fontSize="small"
                      sx={{ mr: 2, color: "text.secondary" }}
                    />
                    <Typography variant="body2">{userData.email}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <HomeIcon
                      fontSize="small"
                      sx={{ mr: 2, color: "text.secondary" }}
                    />
                    <Typography variant="body2">{userData.hometown}</Typography>
                  </Box>
                </Box>
                <Divider />
                <Link href="/userProfile" passHref legacyBehavior>
                  <MenuItem
                    component="a"
                    onClick={handleMenuClose}
                    sx={{ py: 1.5, fontWeight: 500 }}
                  >
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="View Profile" />
                  </MenuItem>
                </Link>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
