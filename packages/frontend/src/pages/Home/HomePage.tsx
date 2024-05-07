import { LightMode } from "@mui/icons-material";
import { Button, Card, CardContent, IconButton, Paper, Switch, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { client } from "../../core/client";
import { useEffect } from "react";

const ThemeShowcaseComponent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "16px",
        margin: "16px",
        textAlign: "center",
        borderRadius: "var(--mui-shape-borderRadius)",
      }}
    >
      <Card
        sx={{
          margin: "16px",
          borderRadius: "var(--mui-shape-borderRadius)",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {t("test")}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: "16px" }}>
            Check out how the theme changes are applied.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "16px", marginBottom: "16px" }}
          >
            Press Me
          </Button>
          <Switch
            checked={true}
            onChange={() => {
              /* Handle theme toggle */
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
          <IconButton aria-label="toggle theme" color="primary">
            <LightMode />
          </IconButton>
        </CardContent>
      </Card>
    </Paper>
  );
};

export function HomePage() {
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await client.User.pagination();
      console.log(users.body);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <ThemeShowcaseComponent />
    </>
  );
}
