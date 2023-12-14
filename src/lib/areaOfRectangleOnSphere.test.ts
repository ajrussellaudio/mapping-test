import { areaOfShape } from "./areaOfRectangleOnSphere";

describe("areaOfRectangleOnSphere", () => {
  it("finds the area of a polygon (kinda)", () => {
    const coords = [
      { latitude: 5, longitude: 0 },
      { latitude: 5, longitude: 2 },
      { latitude: 7, longitude: 2 },
      { latitude: 7, longitude: 0 },
    ];
    expect(areaOfShape(coords)).toEqual(4);
  });
});
