import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AdminDetails from "../../Pages/Admin/AdminDetails";
import { MemoryRouter } from "react-router-dom"; 
import { vi } from "vitest";


beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: vi.fn(() => null), 
    },
    writable: true,
  });
});

describe("AdminDetails", () => {
  test("renders loading state initially", () => {
    render(
      <MemoryRouter>
        <AdminDetails />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays admin details when data is available in localStorage", async () => {
    const mockAdminDetails = {
      ID: "123",
      Name: "John Doe",
      Email: "john@example.com",
      Contact: "1234567890",
      Role: "Admin",
      Libraries: [
        { ID: "1", Name: "Library One" },
        { ID: "2", Name: "Library Two" },
      ],
    };

    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(() => JSON.stringify(mockAdminDetails)),
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <AdminDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
      expect(screen.getByText(/john@example.com/)).toBeInTheDocument();
      expect(screen.getByText(/Library One/)).toBeInTheDocument();
      expect(screen.getByText(/Library Two/)).toBeInTheDocument();
    });
  });

  test("displays a fallback message when no admin details are found", async () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(() => null), 
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <AdminDetails />
      </MemoryRouter>
    );

   
  });

  test("displays no libraries message when no libraries are present", async () => {
    const mockAdminDetails = {
      ID: "123",
      Name: "John Doe",
      Email: "john@example.com",
      Contact: "1234567890",
      Role: "Admin",
      Libraries: [],
    };

    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(() => JSON.stringify(mockAdminDetails)),
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <AdminDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No libraries found")).toBeInTheDocument();
    });
  });
});
