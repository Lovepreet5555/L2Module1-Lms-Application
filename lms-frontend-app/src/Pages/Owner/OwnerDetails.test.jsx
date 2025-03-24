import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import OwnerDetails from "./OwnerDetails"; 

test("displays a fallback message when no owner details are found", async () => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: vi.fn(() => null), 
    },
    writable: true,
  });

  render(
    <MemoryRouter>
      <OwnerDetails />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/No owner details available/i)).toBeInTheDocument();
  });
});

test("displays owner details when data is available in localStorage", async () => {
  // Mock localStorage to return valid owner details
  const ownerDetails = {
    ID: "1",
    Name: "Jane Doe",
    Email: "jane@example.com",
    Contact: "1234567890",
    Role: "Owner",
  };

  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: vi.fn(() => JSON.stringify(ownerDetails)),
    },
    writable: true,
  });

  render(
    <MemoryRouter>
      <OwnerDetails />
    </MemoryRouter>
  );

 
});
