import { render, screen } from "@testing-library/react";
import OwnerPortal from "./OwnerPortal";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

// Mock the OwnerSidebar component
vi.mock("../../Components/SidebarOwner", () => ({
  default: () => <div data-testid="owner-sidebar">Mock Sidebar</div>,
}));

test("renders OwnerPortal with sidebar and welcome message", () => {
  render(
    <BrowserRouter>
      <OwnerPortal />
    </BrowserRouter>
  );

  expect(screen.getByTestId("owner-sidebar")).toBeInTheDocument();

  expect(screen.getByText(/Welcome to the Owner Portal/i)).toBeInTheDocument();
});
