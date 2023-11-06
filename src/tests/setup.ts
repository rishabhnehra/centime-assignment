import { setupServer } from "msw/node";
import { handlers } from "../mocks/handlers";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

const server = setupServer(...handlers);

// server.events.on("request:start", ({ request }) => {
//   console.log("MSW intercepted:", request.method, request.url);
// });

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());
