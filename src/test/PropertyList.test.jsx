import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { FavouritesProvider } from "../context/FavouritesContext";
import PropertyList from "../components/PropertyList";

const mockProperties = [
  {
    id: "prop1",
    type: "House",
    bedrooms: 3,
    price: 750000,
    tenure: "Freehold",
    description: "Property 1",
    location: "Location 1",
    picture: "/img1.jpg",
    added: { month: "October", day: 12, year: 2022 },
  },
  {
    id: "prop2",
    type: "Flat",
    bedrooms: 2,
    price: 400000,
    tenure: "Leasehold",
    description: "Property 2",
    location: "Location 2",
    picture: "/img2.jpg",
    added: { month: "September", day: 14, year: 2022 },
  },
  {
    id: "prop3",
    type: "House",
    bedrooms: 5,
    price: 1250000,
    tenure: "Freehold",
    description: "Property 3",
    location: "Location 3",
    picture: "/img3.jpg",
    added: { month: "July", day: 5, year: 2024 },
  },
];

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <FavouritesProvider>{component}</FavouritesProvider>
    </BrowserRouter>
  );
};

describe("PropertyList Component", () => {
  it("renders correct number of properties", () => {
    const { container } = renderWithProviders(
      <PropertyList properties={mockProperties} />
    );

    // Find the count section specifically
    const countSection = container.querySelector(".property-list__count");
    expect(countSection).toBeTruthy();

    // Check the count number
    const countNumber = within(countSection).getByText("3");
    expect(countNumber).toBeInTheDocument();

    // Check the text contains "Properties Found"
    expect(countSection.textContent).toContain("Properties Found");
  });

  it("displays empty state when no properties", () => {
    renderWithProviders(<PropertyList properties={[]} />);

    expect(screen.getByText(/No Properties Found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Try adjusting your search criteria/i)
    ).toBeInTheDocument();
  });

  it("renders sort dropdown", () => {
    renderWithProviders(<PropertyList properties={mockProperties} />);

    const sortSelect = screen.getByRole("combobox");
    expect(sortSelect).toBeInTheDocument();
  });

  it("displays all property cards", () => {
    renderWithProviders(<PropertyList properties={mockProperties} />);

    // Check that all locations are displayed
    expect(screen.getByText("Location 1")).toBeInTheDocument();
    expect(screen.getByText("Location 2")).toBeInTheDocument();
    expect(screen.getByText("Location 3")).toBeInTheDocument();
  });

  it("shows correct singular/plural text", () => {
    const singleProperty = [mockProperties[0]];
    const { rerender, container } = renderWithProviders(
      <PropertyList properties={singleProperty} />
    );

    // Check singular
    const countSectionSingular = container.querySelector(
      ".property-list__count"
    );
    expect(countSectionSingular.textContent).toContain("1");
    expect(countSectionSingular.textContent).toContain("Property Found");

    // Rerender with multiple properties
    rerender(
      <BrowserRouter>
        <FavouritesProvider>
          <PropertyList properties={mockProperties} />
        </FavouritesProvider>
      </BrowserRouter>
    );

    // Check plural
    const countSectionPlural = container.querySelector(".property-list__count");
    expect(countSectionPlural.textContent).toContain("3");
    expect(countSectionPlural.textContent).toContain("Properties Found");
  });

  it("renders property cards as links", () => {
    renderWithProviders(<PropertyList properties={mockProperties} />);

    // Check that View Details buttons exist
    const viewDetailsButtons = screen.getAllByText(/View Details/i);
    expect(viewDetailsButtons).toHaveLength(3);
  });
});
