import { render, screen } from "@testing-library/react";
import UserPortal from "./UserPortal";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

vi.mock("../../Components/SidebarUser", () => ({
  default: () => <div data-testid="user-sidebar">Mock Sidebar</div>,
}));

test("renders UserPortal with sidebar and welcome message", () => {
  render(
    <BrowserRouter>
      <UserPortal />
    </BrowserRouter>
  );

  expect(screen.getByTestId("user-sidebar")).toBeInTheDocument();

  expect(screen.getByText(/Welcome to the User Portal/i)).toBeInTheDocument();
});
