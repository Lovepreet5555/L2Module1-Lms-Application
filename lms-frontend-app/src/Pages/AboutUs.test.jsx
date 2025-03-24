import { render, screen } from "@testing-library/react";
import AboutUs from "./AboutUs.jsx";

test("renders About Us page correctly", () => {
  render(<AboutUs />);


  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("About Us");


  expect(
    screen.getByText(
      /Welcome to our Library Management System\. We are committed to providing an efficient and user-friendly platform/i
    )
  ).toBeInTheDocument();
});
