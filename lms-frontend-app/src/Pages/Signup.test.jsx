import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import Signup from "./Signup.jsx"; 

test("renders the signup form", () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test("allows user to enter details and submit", () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole("button", { name: /sign up/i });

  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "john@example.com" } });
  fireEvent.click(submitButton);

});
