import { Box, Card, CardContent, TextField, Typography, useTheme } from "@mui/material";
import { ReactApp } from "../../init";

export function ThemeColorConfigurationPage() {
  const theme = useTheme();

  return (
    <>
      <Typography variant="h3">Theme Color Configuration Page</Typography>
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              fullWidth
              focused
              sx={{ "& label": { fontWeight: "bold" } }}
              color="primary"
              label="Primary"
              onChange={e => {
                ReactApp.getInstance().changeTheme({
                  colors: { primary: e.target.value },
                });
              }}
              value={theme.palette.primary.main}
              type="color"
            />
            <TextField
              fullWidth
              focused
              sx={{ "& label": { fontWeight: "bold" } }}
              color="secondary"
              label="Secondary"
              defaultValue={theme.palette.secondary.main}
              type="color"
            />
            <TextField
              fullWidth
              focused
              sx={{ "& label": { fontWeight: "bold" } }}
              color="success"
              label="Success"
              defaultValue={theme.palette.success.main}
              type="color"
            />
            <TextField
              fullWidth
              focused
              sx={{ "& label": { fontWeight: "bold" } }}
              color="warning"
              label="Warning"
              defaultValue={theme.palette.warning.main}
              type="color"
            />
            <TextField
              fullWidth
              sx={{ "& label": { fontWeight: "bold" } }}
              color="error"
              label="Error"
              defaultValue={theme.palette.error.main}
              type="color"
            />
            <TextField
              fullWidth
              focused
              sx={{ "& label": { fontWeight: "bold" } }}
              color="info"
              label="Info"
              defaultValue={theme.palette.info.main}
              type="color"
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
