import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "./App";
import { analytics } from "./mocks/handlers";

describe("App", () => {
  it("should render nav", () => {
    render(<App />);
    expect(screen.getByText(/Centime/i)).toBeVisible();
  });

  it("should render table after api call", async () => {
    render(<App />);

    await waitFor(async () => {
      expect(screen.getAllByRole("row").length).toBe(5);
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

  it("should update table on new data entry", async () => {
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
  it("should update table on deleting data entry", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitForElementToBeRemoved(() => screen.queryByText("nothingToShow"));

    expect(screen.getAllByRole("row").length).toBe(5);
    await user.click(screen.getAllByRole("button", { name: "delete" })[0]);
    expect(screen.getAllByRole("row").length).toBe(4);
  });
  it("should update table on updating data entry", async () => {
    const SOURCE_TEXT = "edit-source";
    const TARGET_TEXT = "edit-target";
    const VALUE_NUMBER = "100";
    const user = userEvent.setup();
    render(<App />);

    await waitForElementToBeRemoved(() => screen.queryByText("nothingToShow"));

    await user.click(screen.getAllByRole("button", { name: "edit" })[0]);

    const source = screen.getByRole("textbox", { name: "source" });
    const target = screen.getByRole("textbox", { name: "target" });
    const value = screen.getByRole("spinbutton");

    expect(source).toHaveValue(analytics[0].source);
    expect(target).toHaveValue(analytics[0].target);
    expect(value).toHaveValue(analytics[0].value);

    await user.clear(source);
    await user.type(source, SOURCE_TEXT);
    expect(source).toHaveValue(SOURCE_TEXT);

    await user.clear(target);
    await user.type(target, TARGET_TEXT);
    expect(target).toHaveValue(TARGET_TEXT);

    await user.clear(value);
    await user.type(value, VALUE_NUMBER);

    await user.click(screen.getByText("saveChange"));

    await waitFor(() => {
      expect(screen.getByText(SOURCE_TEXT)).toBeInTheDocument();
      expect(screen.getByText(TARGET_TEXT)).toBeInTheDocument();
      expect(screen.getByText(VALUE_NUMBER)).toBeInTheDocument();
    });
  });
});
