import * as icons from "@mui/icons-material";
import * as mui from "@mui/material";
import * as React from "react";

import { GuidedTour } from "./GuidedTour";

export const IndexPage: React.FC = () => {
  return (
    <mui.Container maxWidth="md" style={{ marginTop: "4rem", textAlign: "center" }}>
      {/* Title Section */}
      <mui.Typography variant="h3" gutterBottom>
        Welcome to TypeScript Monorepo Starter
      </mui.Typography>
      <mui.Typography variant="subtitle1" color="textSecondary" gutterBottom>
        A boilerplate template for scalable full-stack development
      </mui.Typography>

      {/* Action Button */}
      <mui.Box marginY={4}>
        <mui.Button
          variant="contained"
          color="primary"
          startIcon={<icons.PlayArrow />}
          size="large"
          href="https://github.com/your-repo-link" // Replace with your repo link
        >
          Get Started on GitHub
        </mui.Button>

        <GuidedTour />
      </mui.Box>

      {/* Info Cards */}
      <mui.Grid container spacing={4}>
        <mui.Grid item xs={12} md={6}>
          <mui.Card>
            <mui.CardContent>
              <mui.Typography variant="h6" gutterBottom>
                Packages Structure
              </mui.Typography>
              <mui.Typography variant="body2" color="textSecondary">
                Your application is organized into packages under the "packages/{`{APP_NAME}`}/
                {`{PACKAGE_NAME}`}" structure for easy scaling and modularity.
              </mui.Typography>
            </mui.CardContent>
          </mui.Card>
        </mui.Grid>
        <mui.Grid item xs={12} md={6}>
          <mui.Card>
            <mui.CardContent>
              <mui.Typography variant="h6" gutterBottom>
                MERN Stack Ready
              </mui.Typography>
              <mui.Typography variant="body2" color="textSecondary">
                This monorepo starter comes pre-configured with a full MERN stack setup for fast
                development of enterprise applications.
              </mui.Typography>
            </mui.CardContent>
          </mui.Card>
        </mui.Grid>
      </mui.Grid>

      {/* Quick Start Section */}
      <mui.Box marginY={4}>
        <mui.Paper elevation={2} style={{ padding: "1.5rem", textAlign: "left" }}>
          <mui.Typography variant="h6" gutterBottom>
            Quick Start
          </mui.Typography>
          <mui.Typography variant="body1" gutterBottom>
            1. Clone the repository:{" "}
            <mui.Chip label="git clone https://github.com/your-repo-link" variant="outlined" />
          </mui.Typography>
          <mui.Typography variant="body1" gutterBottom>
            2. Navigate to your desired package and start developing!
          </mui.Typography>
        </mui.Paper>
      </mui.Box>

      {/* Footer */}
      <mui.Box marginTop={6} color="textSecondary">
        <mui.Typography variant="caption">
          © 2024 TypeScript Monorepo Starter. Crafted for scalable development.
        </mui.Typography>
      </mui.Box>
    </mui.Container>
  );
};
