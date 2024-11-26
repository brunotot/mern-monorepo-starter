/// <reference types="@testing-library/jest-dom" />

import HomePage from "@/app/pages/home";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("renders the App component", () => {
    render(<HomePage />);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
