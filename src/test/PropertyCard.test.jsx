import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { FavouritesProvider } from "../context/FavouritesContext";
import PropertyCard from "../components/PropertyCard";

// Test property data
const mockProperty = {
  id: "test-prop-1",
  type: "House",
  bedrooms: 3,
  price: 750000,
  tenure: "Freehold",
  description:
    "A beautiful three bedroom house with a large garden and modern kitchen.  Perfect for families.",
  location: "Petts Wood Road, Orpington BR5",
  picture: "/images/prop1/1.jpg",
  added: {
    month: "October",
    day: 12,
    year: 2022,
  },
};

// Wrapper component for tests
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <FavouritesProvider>{component}</FavouritesProvider>
    </BrowserRouter>
  );
};

describe("PropertyCard Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders property details correctly", () => {
    renderWithProviders(<PropertyCard property={mockProperty} />);

    // Check if location is displayed
    expect(
      screen.getByText("Petts Wood Road, Orpington BR5")
    ).toBeInTheDocument();

    // Check if price is formatted correctly
    expect(screen.getByText("£750,000")).toBeInTheDocument();

    // Check if bedrooms are displayed
    expect(screen.getByText(/3 bedrooms/i)).toBeInTheDocument();

    // Check if property type badge is displayed
    expect(screen.getByText("House")).toBeInTheDocument();

    // Check if tenure is displayed
    expect(screen.getByText("Freehold")).toBeInTheDocument();
  });

  it("displays truncated description", () => {
    renderWithProviders(<PropertyCard property={mockProperty} />);

    // Check that description is truncated
    const description = screen.getByText(/A beautiful three bedroom house/i);
    expect(description).toBeInTheDocument();
    expect(description.textContent).toContain("...");
  });

  it("renders favourite button with correct initial state", () => {
    renderWithProviders(<PropertyCard property={mockProperty} />);

    const favouriteButton = screen.getByRole("button", {
      name: /add to favourites/i,
    });
    expect(favouriteButton).toBeInTheDocument();
    expect(favouriteButton).toHaveTextContent("♡");
  });

  it('renders "View Details" link with correct URL', () => {
    renderWithProviders(<PropertyCard property={mockProperty} />);

    const viewDetailsLink = screen.getByRole("link", { name: /view details/i });
    expect(viewDetailsLink).toBeInTheDocument();
    expect(viewDetailsLink).toHaveAttribute("href", "/property/test-prop-1");
  });

  it("displays date added correctly", () => {
    renderWithProviders(<PropertyCard property={mockProperty} />);

    expect(screen.getByText(/Added: October 2022/i)).toBeInTheDocument();
  });
});
