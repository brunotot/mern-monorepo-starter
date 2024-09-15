/// <reference types="@testing-library/jest-dom" />

import { render, screen } from "@testing-library/react";
import { Status404Page } from "@org/app-vite-react/app/pages/Status404/Status404Page";

describe("App", () => {
  it("renders the App component", () => {
    render(<Status404Page />);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
