import { expect, afterEach, beforeAll, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { cleanup } from "@testing-library/react";
import { handlers } from "../mocks/handlers";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

const server = setupServer(...handlers);

server.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url);
});

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());
