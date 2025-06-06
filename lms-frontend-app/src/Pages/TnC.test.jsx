import { render, screen } from "@testing-library/react";
import TermsAndConditions from "./TnC.jsx" ;
test("renders Terms and Conditions page correctly", () => {
  render(<TermsAndConditions />);


  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Terms and Conditions");


  expect(
    screen.getByText(/By using our Library Management System, you agree to the following terms and conditions:/i)
  ).toBeInTheDocument();

  
  const terms = [
    "All books must be returned within the due date.",
    "Late returns may incur a penalty.",
    "Library members must maintain the books in good condition.",
    "Any damage or loss of books must be reported immediately.",
    "The library reserves the right to suspend or terminate access for violations.",
  ];

  terms.forEach((term) => {
    expect(screen.getByText(term)).toBeInTheDocument();
  });
});
