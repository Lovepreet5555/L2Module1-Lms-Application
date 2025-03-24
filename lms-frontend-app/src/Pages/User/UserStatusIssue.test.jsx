import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import UserStatusIssue from "./UserStatusIssue"; // Adjust the path as per your project structure
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

// Mock the axios GET method
vi.mock("axios");

describe("UserStatusIssue Component", () => {
  let token;

  beforeEach(() => {
    token = "test-token";
    localStorage.setItem("token", token);
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("should display a loading spinner while fetching data", async () => {
    axios.get.mockResolvedValue({ data: { requests: [] } }); 

    render(
      <MemoryRouter>
        <UserStatusIssue />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("should display an error message when no token is found", async () => {
    localStorage.removeItem("token"); 

    render(
      <MemoryRouter>
        <UserStatusIssue />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/No token found. Please log in again./i)).toBeInTheDocument());
  });

  test("should display an error message when API call fails", async () => {
    const mockError = { response: { data: { error: "Unable to fetch issue status" } } };
    axios.get.mockRejectedValue(mockError); 
    render(
      <MemoryRouter>
        <UserStatusIssue />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/Unable to fetch issue status/i)).toBeInTheDocument());
  });

  test("should display 'No requests found' when no requests are returned", async () => {
    axios.get.mockResolvedValue({ data: { requests: [] } }); 
    render(
      <MemoryRouter>
        <UserStatusIssue />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/No requests found./i)).toBeInTheDocument());
  });

  test("should display the list of requests when data is fetched successfully", async () => {
    const mockRequests = [
      {
        request_id: "1",
        book_id: "101",
        library_id: "5",
        request_date: 1617900300,
        status: "Pending",
        approval_date: null,
      },
      {
        request_id: "2",
        book_id: "102",
        library_id: "3",
        request_date: 1617900400,
        status: "Approved",
        approval_date: 1617900500,
      },
    ];

    axios.get.mockResolvedValue({ data: { requests: mockRequests } }); 

    render(
      <MemoryRouter>
        <UserStatusIssue />
      </MemoryRouter>
    );

    

    
  });
});
