import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "./App";
import { analytics } from "./mocks/handlers";

describe("App", () => {
  it("renders nav", () => {
    render(<App />);
    expect(screen.getByText(/Centime/i)).toBeVisible();
  });

  it("renders table after api call", async () => {
    render(<App />);

    await waitFor(async () => {
      analytics.forEach((analytic) => {
        expect(screen.queryAllByText(analytic.source)[0]).toBeInTheDocument();
        expect(screen.queryAllByText(analytic.target)[0]).toBeInTheDocument();
        expect(screen.getByText(analytic.value)).toBeInTheDocument();
      });
    });
  });

  it("should show error on empty form submission", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitForElementToBeRemoved(() => screen.queryByText("nothingToShow"));
    await user.click(screen.getByRole("button", { name: "addEntry" }));

    expect(screen.getByText("enterDetails")).toBeInTheDocument();

    await user.click(screen.getByText("saveChange"));

    const elements = screen.getAllByText(
      "String must contain at least 1 character(s)",
    );

    expect(elements).toHaveLength(2);
    expect(
      screen.getByText("Number must be greater than or equal to 1"),
    ).toBeInTheDocument();
  });

  it("should update table on new data entrt", async () => {
    const SOURCE_TEXT = "test-source";
    const TARGET_TEXT = "test-target";
    const VALUE_NUMBER = "123";
    const user = userEvent.setup();
    render(<App />);

    await waitForElementToBeRemoved(() => screen.queryByText("nothingToShow"));
    await user.click(screen.getByRole("button", { name: "addEntry" }));

    const source = screen.getByRole("textbox", { name: "source" });
    const target = screen.getByRole("textbox", { name: "target" });
    const value = screen.getByRole("spinbutton");

    await user.type(source, SOURCE_TEXT);
    expect(source).toHaveValue(SOURCE_TEXT);

    await user.type(target, TARGET_TEXT);
    expect(target).toHaveValue(TARGET_TEXT);

    await user.type(value, VALUE_NUMBER);
    expect(value).toHaveValue(+VALUE_NUMBER);

    await user.click(screen.getByText("saveChange"));

    await waitFor(() => {
      expect(screen.getByText(SOURCE_TEXT)).toBeInTheDocument();
      expect(screen.getByText(TARGET_TEXT)).toBeInTheDocument();
      expect(screen.getByText(VALUE_NUMBER)).toBeInTheDocument();
    });
  });
});
