import { Box, Avatar } from "@mui/material";
import { User } from "@/gen/output";

interface ProfileImageProps {
  user: User;
  imageUrl?: string;
}

export default function ProfileImage({ user, imageUrl }: ProfileImageProps) {
  const name = `${user.name} ${user.surname}`;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Avatar
        src={imageUrl}
        alt={name}
        sx={{
          width: 260,
          height: 260,
          fontSize: 80,
          bgcolor: "primary.main",
          border: "4px solid",
          borderColor: "divider",
        }}
      >
        {!imageUrl && initials}
      </Avatar>
    </Box>
  );
}
