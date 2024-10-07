import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";

export function HomePage() {
  const dependencies = [
    {
      name: "React",
      description: "A JavaScript library for building user interfaces.",
      icon: <icons.Code sx={{ fontSize: 60, color: "var(--mui-palette-primary-main)" }} />,
    },
    {
      name: "Material UI",
      description: "React components for faster and easier web development.",
      icon: <icons.Style sx={{ fontSize: 60, color: "var(--mui-palette-secondary-main)" }} />,
    },
    {
      name: "React Router",
      description: "Declarative routing for React applications.",
      icon: <icons.Directions sx={{ fontSize: 60, color: "var(--mui-palette-info-main)" }} />,
    },
    {
      name: "React Query",
      description: "Fetching, caching, and updating data in React.",
      icon: <icons.Sync sx={{ fontSize: 60, color: "var(--mui-palette-success-main)" }} />,
    },
    {
      name: "Keycloak",
      description: "Open source identity and access management.",
      icon: <icons.Security sx={{ fontSize: 60, color: "var(--mui-palette-error-main)" }} />,
    },
    {
      name: "i18next",
      description: "Internationalization framework for JavaScript.",
      icon: <icons.Language sx={{ fontSize: 60, color: "var(--mui-palette-warning-main)" }} />,
    },
    {
      name: "@org/lib-api-client",
      description: "Workspace library for API abstraction.",
      icon: <icons.Api sx={{ fontSize: 60, color: "var(--mui-palette-text-secondary)" }} />,
    },
    {
      name: "@org/lib-commons",
      description: "Workspace library for shared logic.",
      icon: <icons.Share sx={{ fontSize: 60, color: "var(--mui-palette-action-active)" }} />,
    },
  ];

  return (
    <mui.Container>
      <mui.Box sx={{ textAlign: "center", mb: 5 }}>
        <mui.Typography variant="h3" component="h1" pb={2}>
          TypeScript Monorepo Starter
        </mui.Typography>
        <mui.Grid2 container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          {dependencies.map(dep => (
            <mui.Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={dep.name}>
              <mui.Paper
                elevation={3}
                sx={{
                  p: 2,
                  textAlign: "center",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  height: 250,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--mui-palette-background-paper)",
                }}
              >
                <mui.Box sx={{ mb: 1 }}>{dep.icon}</mui.Box>
                <mui.Typography variant="h6" gutterBottom>
                  {dep.name}
                </mui.Typography>
                <mui.Typography variant="body2">{dep.description}</mui.Typography>
              </mui.Paper>
            </mui.Grid2>
          ))}
        </mui.Grid2>
      </mui.Box>
    </mui.Container>
  );
}
