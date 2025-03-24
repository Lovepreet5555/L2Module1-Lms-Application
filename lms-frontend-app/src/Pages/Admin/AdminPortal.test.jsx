import { render, screen } from "@testing-library/react";
import AdminPortal from "./AdminPortal";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

vi.mock("../../Components/SidebarAdmin", () => ({
  default: () => <div data-testid="admin-sidebar">Mock Sidebar</div>,
}));

test("renders AdminPortal with sidebar and welcome message", () => {
  render(
    <BrowserRouter>
      <AdminPortal />
    </BrowserRouter>
  );

  expect(screen.getByTestId("admin-sidebar")).toBeInTheDocument();

  expect(screen.getByText(/Welcome to the Admin Portal/i)).toBeInTheDocument();
});
