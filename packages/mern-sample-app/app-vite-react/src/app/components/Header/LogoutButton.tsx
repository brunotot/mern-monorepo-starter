import type { FC } from "react";

import { MenuItem, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface LogoutMenuItemProps {
  handleLogout: () => void;
}

const LogoutButton: FC<LogoutMenuItemProps> = ({ handleLogout }) => {
  const theme = useTheme();

  return (
    <MenuItem
      onClick={handleLogout}
      sx={{
        color: theme.palette.warning.main,
        justifyContent: "center", // Added justifyContent: center
        "&:hover": {
          //backgroundColor: theme.palette.warning.light,
        },
      }}
    >
      <Typography variant="inherit" sx={{ fontWeight: "bold", textAlign: "center" }}>
        Logout
      </Typography>
    </MenuItem>
  );
};

export default LogoutButton;
