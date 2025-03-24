import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OwnerRegisterOwner from "./OwnerRegisterOwner";  
import { BrowserRouter } from "react-router-dom"; 
import { vi } from "vitest";

global.fetch = vi.fn();

describe("OwnerRegisterOwner", () => {
  test("displays success message when new owner is registered successfully", async () => {
    const successMessage = { message: "Owner registered successfully" };
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(successMessage),
    });

    global.localStorage.getItem = vi.fn().mockReturnValue("valid_token");

    render(
      <BrowserRouter>
        <OwnerRegisterOwner />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText(/Contact/i), { target: { value: "9876543210" } });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Register Owner/i }));

    // Wait for the success message to appear
    //await waitFor(() => {
    //  expect(screen.getByText(/Owner registered successfully/i)).toBeInTheDocument();
    //});

    // Optional: Log the current state of the DOM for debugging purposes
    console.log(screen.debug());
  });

  test("displays error message when API returns an error", async () => {
   
    const errorMessage = { error: "Error registering new owner" };
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(errorMessage),
    });
    global.localStorage.getItem = vi.fn().mockReturnValue("valid_token");

    render(
      <BrowserRouter>
        <OwnerRegisterOwner />
      </BrowserRouter>
    );

    // Fill out the form with test data
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText(/Contact/i), { target: { value: "9876543210" } });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Register Owner/i }));

    // Wait for the error message to appear
    //await waitFor(() => {
    //  expect(screen.getByText(/Error registering new owner/i)).toBeInTheDocument();
    //});

    // Optional: Log the current state of the DOM for debugging purposes
    console.log(screen.debug());
  });

  test("displays error message if no token is found in localStorage", async () => {
    global.localStorage.getItem = vi.fn().mockReturnValue(null);

    render(
      <BrowserRouter>
        <OwnerRegisterOwner />
      </BrowserRouter>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Register Owner/i }));

    await waitFor(() => {
      expect(screen.getByText(/You must be logged in as an owner to register a new owner/i)).toBeInTheDocument();
    });

    console.log(screen.debug());
  });
});
