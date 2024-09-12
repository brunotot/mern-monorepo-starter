/// <reference types="@testing-library/jest-dom" />

import { render, screen } from "@testing-library/react";
import PreferencesPage from "@org/app-vite-react/app/pages/Preferences/PreferencesPage";

describe("App", () => {
  it("renders the App component", () => {
    render(<PreferencesPage />);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
