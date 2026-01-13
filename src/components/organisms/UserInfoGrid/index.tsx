import { Paper, Typography, Box, Divider } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CakeIcon from "@mui/icons-material/Cake";
import WorkIcon from "@mui/icons-material/Work";
import { User } from "@/gen/output";

interface UserInfoGridProps {
  userData: User;
}

export default function UserInfoGrid({ userData }: UserInfoGridProps) {
  const infoItems = [
    {
      icon: <EmailIcon />,
      label: "Email",
      value: userData.email,
    },
    {
      icon: <PhoneIcon />,
      label: "Phone",
      value: userData.phone,
    },
    {
      icon: <HomeIcon />,
      label: "Hometown",
      value: userData.hometown,
    },
    {
      icon: <CakeIcon />,
      label: "Birth Date",
      value: userData.birth_date,
    },
    {
      icon: <WorkIcon />,
      label: "Job",
      value: userData.job,
    },
  ];

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        border: 1, 
        borderColor: "divider" 
      }}
    >
      <Typography variant="h6" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
        Personal Information
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {infoItems.map((item, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <Box sx={{ color: "text.secondary", mr: 1, display: "flex" }}>
              {item.icon}
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {item.label}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ ml: 4 }}>
            {item.value}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
}
