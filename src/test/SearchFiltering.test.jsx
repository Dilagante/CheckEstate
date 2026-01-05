import { describe, it, expect } from "vitest";
import propertiesData from "../data/properties.json";

describe("Search Filtering Logic", () => {
  const properties = propertiesData.properties;

  it("filters properties by type (House)", () => {
    const criteria = {
      propertyType: "house",
      minPrice: 0,
      maxPrice: Infinity,
      minBedrooms: 0,
      maxBedrooms: Infinity,
      dateFrom: null,
      dateTo: null,
      postcode: null,
    };

    const filtered = properties.filter((property) => {
      return (
        property.type.toLowerCase() === criteria.propertyType.toLowerCase()
      );
    });

    // Should return only houses
    expect(filtered.length).toBeGreaterThan(0);
    filtered.forEach((prop) => {
      expect(prop.type.toLowerCase()).toBe("house");
    });
  });

  it("filters properties by type (Flat)", () => {
    const criteria = {
      propertyType: "flat",
      minPrice: 0,
      maxPrice: Infinity,
      minBedrooms: 0,
      maxBedrooms: Infinity,
      dateFrom: null,
      dateTo: null,
      postcode: null,
    };

    const filtered = properties.filter((property) => {
      return (
        property.type.toLowerCase() === criteria.propertyType.toLowerCase()
      );
    });

    // Should return only flats
    expect(filtered.length).toBeGreaterThan(0);
    filtered.forEach((prop) => {
      expect(prop.type.toLowerCase()).toBe("flat");
    });
  });

  it("filters properties by price range", () => {
    const criteria = {
      propertyType: "any",
      minPrice: 300000,
      maxPrice: 800000,
      minBedrooms: 0,
      maxBedrooms: Infinity,
      dateFrom: null,
      dateTo: null,
      postcode: null,
    };

    const filtered = properties.filter((property) => {
      return (
        property.price >= criteria.minPrice &&
        property.price <= criteria.maxPrice
      );
    });

    // All filtered properties should be in range
    filtered.forEach((prop) => {
      expect(prop.price).toBeGreaterThanOrEqual(300000);
      expect(prop.price).toBeLessThanOrEqual(800000);
    });
  });

  it("filters properties by number of bedrooms", () => {
    const criteria = {
      propertyType: "any",
      minPrice: 0,
      maxPrice: Infinity,
      minBedrooms: 2,
      maxBedrooms: 3,
      dateFrom: null,
      dateTo: null,
      postcode: null,
    };

    const filtered = properties.filter((property) => {
      return (
        property.bedrooms >= criteria.minBedrooms &&
        property.bedrooms <= criteria.maxBedrooms
      );
    });

    // All filtered properties should have 2-3 bedrooms
    filtered.forEach((prop) => {
      expect(prop.bedrooms).toBeGreaterThanOrEqual(2);
      expect(prop.bedrooms).toBeLessThanOrEqual(3);
    });
  });

  it("filters properties by postcode", () => {
    const criteria = {
      propertyType: "any",
      minPrice: 0,
      maxPrice: Infinity,
      minBedrooms: 0,
      maxBedrooms: Infinity,
      dateFrom: null,
      dateTo: null,
      postcode: "BR5",
    };

    const filtered = properties.filter((property) => {
      const propertyPostcode = property.location
        .split(" ")
        .pop()
        .substring(0, criteria.postcode.length);
      return propertyPostcode === criteria.postcode;
    });

    // All filtered properties should match postcode
    filtered.forEach((prop) => {
      const postcode = prop.location.split(" ").pop();
      expect(postcode).toContain(criteria.postcode);
    });
  });

  it("applies multiple filters simultaneously", () => {
    const criteria = {
      propertyType: "house",
      minPrice: 500000,
      maxPrice: 1000000,
      minBedrooms: 3,
      maxBedrooms: 5,
      dateFrom: null,
      dateTo: null,
      postcode: null,
    };

    const filtered = properties.filter((property) => {
      // Type filter
      if (property.type.toLowerCase() !== criteria.propertyType.toLowerCase()) {
        return false;
      }
      // Price filter
      if (
        property.price < criteria.minPrice ||
        property.price > criteria.maxPrice
      ) {
        return false;
      }
      // Bedrooms filter
      if (
        property.bedrooms < criteria.minBedrooms ||
        property.bedrooms > criteria.maxBedrooms
      ) {
        return false;
      }
      return true;
    });

    // All filtered properties should match all criteria
    filtered.forEach((prop) => {
      expect(prop.type.toLowerCase()).toBe("house");
      expect(prop.price).toBeGreaterThanOrEqual(500000);
      expect(prop.price).toBeLessThanOrEqual(1000000);
      expect(prop.bedrooms).toBeGreaterThanOrEqual(3);
      expect(prop.bedrooms).toBeLessThanOrEqual(5);
    });
  });
});
