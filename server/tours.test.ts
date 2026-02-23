import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";

describe("Tours Router", () => {
  it("should fetch all tours", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const tours = await caller.tours.list();

    expect(Array.isArray(tours)).toBe(true);
    expect(tours.length).toBeGreaterThan(0);

    // Check tour structure
    const tour = tours[0];
    expect(tour).toHaveProperty("id");
    expect(tour).toHaveProperty("name");
    expect(tour).toHaveProperty("price");
    expect(tour).toHaveProperty("category");
    expect(tour).toHaveProperty("duration");
  });

  it("should fetch a specific tour by ID", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    // First get all tours to get a valid ID
    const tours = await caller.tours.list();
    if (tours.length === 0) {
      console.warn("No tours in database, skipping test");
      return;
    }

    const tourId = tours[0].id;
    const tour = await caller.tours.getById(tourId);

    expect(tour).toBeDefined();
    expect(tour?.id).toBe(tourId);
    expect(tour?.name).toBeDefined();
  });

  it("should have correct tour categories", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const tours = await caller.tours.list();
    const categories = tours.map((t) => t.category);
    const validCategories = ["jeep-tour", "wellness", "combined"];

    categories.forEach((cat) => {
      expect(validCategories).toContain(cat);
    });
  });
});
