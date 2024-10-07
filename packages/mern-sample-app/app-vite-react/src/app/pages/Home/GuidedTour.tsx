//import * as mui from "@mui/material";

import * as mui from "@mui/material";
import * as driverJs from "driver.js";
import "driver.js/dist/driver.css";
import ReactDOM from "react-dom/client";

//function exec() {}

export type PopoverRender = (
  popover: driverJs.PopoverDOM,
  opts: {
    config: driverJs.Config;
    state: driverJs.State;
  },
) => void;

function buildPopoverRender(reactNode: React.ReactNode): PopoverRender {
  return popover => {
    const replacementDiv = document.createElement("div");
    popover.description.parentNode!.replaceChild(replacementDiv, popover.description);
    const root = ReactDOM.createRoot(replacementDiv);
    root.render(reactNode);
  };
}

const driverObj = driverJs.driver({
  showProgress: true,
  steps: [
    {
      element: "[data-driver='breadcrumbs']", // The id or className of the div which you want to focous of highlight
      popover: {
        title: "Breadcrumbs",
        onPopoverRender: buildPopoverRender(<div>Breadcrumbs details</div>),
        side: "over",
      },
    },
    {
      element: "[data-driver='darkTheme']", // The id or className of the div which you want to focous of highlight
      popover: {
        title: "Dark mode",
        onPopoverRender: buildPopoverRender(<div>Choose between dark and light mode</div>),
        side: "over",
      },
    },
    {
      element: "[data-driver='layout']", // The id or className of the div which you want to focous of highlight
      popover: {
        title: "Page layout",
        onPopoverRender: buildPopoverRender(
          <div>Choose between horizontal and sidebar layout</div>,
        ),
        side: "over",
      },
    },
    {
      element: "[data-driver='systemLanguage']", // The id or className of the div which you want to focous of highlight
      popover: {
        title: "System language",
        onPopoverRender: buildPopoverRender(<div>Choose page language</div>),
        side: "over",
      },
    },
    {
      element: "[data-driver='userPanel']", // The id or className of the div which you want to focous of highlight
      popover: {
        title: "User panel",
        onPopoverRender: buildPopoverRender(<div>User panel details</div>),
        side: "over",
      },
    },
    {
      element: "[data-driver='navigation']", // The id or className of the div which you want to focous of highlight
      popover: {
        title: "Navigation",
        onPopoverRender: buildPopoverRender(<div>Navigation details</div>),
        side: "over",
      },
    },
    {
      element: "[data-driver='content']", // The id or className of the div which you want to focous of highlight
      popover: {
        title: "Content",
        onPopoverRender: buildPopoverRender(<div>Content details</div>),
        side: "over",
      },
    },
    {
      element: "[data-driver='footer']", // The id or className of the div which you want to focous of highlight
      popover: {
        title: "Footer",
        onPopoverRender: buildPopoverRender(<div>Footer details</div>),
        side: "over",
      },
    },
  ],
});

function drive(obj: ReturnType<typeof driverJs.driver>) {
  obj.drive();
}

export function GuidedTour() {
  // return <mui.Button onClick={exec}>TOUR</mui.Button>;

  return (
    <>
      <mui.Button onClick={() => drive(driverObj)}>DRIVE</mui.Button>
    </>
  );
}
