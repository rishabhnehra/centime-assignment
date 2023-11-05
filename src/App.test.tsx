import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders nav", () => {
    render(<App />);
    expect(screen.getByText(/Centime/i)).toBeDefined();
  });

  it("renders table after api call", async () => {
    render(<App />, { hydrate: true });
    const result = await screen.findByText(/Salary/i);

    expect(result).toBeDefined();
  });
});
