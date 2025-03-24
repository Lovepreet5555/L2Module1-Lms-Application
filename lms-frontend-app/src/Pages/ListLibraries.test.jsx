import { render, screen, waitFor } from "@testing-library/react";
import ListLibraries from "./ListLibraries.jsx";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest"; 

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

test("renders Library List page correctly", async () => {
  fetch.mockResolvedValueOnce({
    json: async () => ({
      libraries: [
        { ID: 1, Name: "Central Library" },
        { ID: 2, Name: "City Library" },
      ],
    }),
  });

  render(
    <BrowserRouter>
      <ListLibraries />
    </BrowserRouter>
  );

  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Library List");


  await waitFor(() => {
    expect(screen.getByText("Central Library")).toBeInTheDocument();
    expect(screen.getByText("City Library")).toBeInTheDocument();
  });
});

test("handles API error gracefully", async () => {
  fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

  render(
    <BrowserRouter>
      <ListLibraries />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("No libraries found.")).toBeInTheDocument();
  });
});
