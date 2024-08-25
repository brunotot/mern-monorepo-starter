/**
 * @packageDocumentation Middleware which passes manages context for route sessions.
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/singletons/RouterCollection";
import helmet from "helmet";

/*const cspConfig = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"], // Adjust this according to your needs
    styleSrc: ["'self'", "'unsafe-inline'"], // If you have inline styles
    imgSrc: ["'self'", "data:"], // Allow images from the same origin and data URIs
    connectSrc: ["'self'"], // Allow AJAX, WebSocket, etc.
    fontSrc: ["'self'"], // Allow fonts to be loaded from the same origin
    objectSrc: ["'none'"], // Disallow <object>, <embed>, <applet>
    upgradeInsecureRequests: [], // Automatically upgrade HTTP to HTTPS
  },
};*/

export const withCsp: RouteMiddlewareFactory = () => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'"],
        "connect-src": ["'self'", "'unsafe-inline'"],
      },
    },
    crossOriginOpenerPolicy: {
      policy: "unsafe-none",
    },
  });
};
