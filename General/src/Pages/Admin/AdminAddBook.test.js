//npm install --save-dev jest @testing-library/react @testing-library/jest-dom
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminAddBook from "./AdminAddBook";

beforeEach(() => {
  fetch.resetMocks();
});

test("renders the book addition form", () => {
  render(<AdminAddBook />);

  expect(screen.getByText("Add a New Book")).toBeInTheDocument();
  expect(screen.getByLabelText("ISBN:")).toBeInTheDocument();
  expect(screen.getByLabelText("Title:")).toBeInTheDocument();
  expect(screen.getByLabelText("Authors:")).toBeInTheDocument();
  expect(screen.getByLabelText("Publisher:")).toBeInTheDocument();
  expect(screen.getByLabelText("Version:")).toBeInTheDocument();
  expect(screen.getByLabelText("Total Copies:")).toBeInTheDocument();
  expect(screen.getByLabelText("Library ID:")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Add Book" })).toBeInTheDocument();
});

test("shows validation error if required fields are empty", async () => {
  render(<AdminAddBook />);

  const addButton = screen.getByRole("button", { name: "Add Book" });
  fireEvent.click(addButton);

  expect(await screen.findByText("ISBN:")).toBeInTheDocument();
  expect(await screen.findByText("Title:")).toBeInTheDocument();
});

test("allows input and updates values correctly", () => {
  render(<AdminAddBook />);

  const isbnInput = screen.getByLabelText("ISBN:");
  fireEvent.change(isbnInput, { target: { value: "1234567890" } });
  expect(isbnInput.value).toBe("1234567890");

  const titleInput = screen.getByLabelText("Title:");
  fireEvent.change(titleInput, { target: { value: "React for Beginners" } });
  expect(titleInput.value).toBe("React for Beginners");
});

test("submits form and handles API success response", async () => {
  fetch.mockResponseOnce(JSON.stringify({ message: "Book added successfully" }), { status: 200 });

  render(<AdminAddBook />);

  fireEvent.change(screen.getByLabelText("ISBN:"), { target: { value: "1234567890" } });
  fireEvent.change(screen.getByLabelText("Title:"), { target: { value: "React for Beginners" } });
  fireEvent.change(screen.getByLabelText("Authors:"), { target: { value: "John Doe" } });
  fireEvent.change(screen.getByLabelText("Publisher:"), { target: { value: "TechPress" } });
  fireEvent.change(screen.getByLabelText("Version:"), { target: { value: "1st Edition" } });
  fireEvent.change(screen.getByLabelText("Total Copies:"), { target: { value: "10" } });
  fireEvent.change(screen.getByLabelText("Library ID:"), { target: { value: "1" } });

  fireEvent.click(screen.getByRole("button", { name: "Add Book" }));

  await waitFor(() => expect(screen.getByText("Book added successfully")).toBeInTheDocument());
});

test("handles API error response correctly", async () => {
  fetch.mockRejectOnce(new Error("Failed to add book"));

  render(<AdminAddBook />);

  fireEvent.change(screen.getByLabelText("ISBN:"), { target: { value: "1234567890" } });
  fireEvent.change(screen.getByLabelText("Title:"), { target: { value: "React for Beginners" } });

  fireEvent.click(screen.getByRole("button", { name: "Add Book" }));

  await waitFor(() => expect(screen.getByText("Failed to add book")).toBeInTheDocument());
});
