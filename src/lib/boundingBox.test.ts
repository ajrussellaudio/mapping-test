import { boundingBox } from "./boundingBox";

describe("boundingBox", () => {
  it("gives the furthest cardinal points of a list of coords", () => {
    const coords = [
      { latitude: 5, longitude: 0 },
      { latitude: 5, longitude: 1 },
      { latitude: 6, longitude: 1 },
      { latitude: 6, longitude: 0 },
    ];
    expect(boundingBox(coords)).toEqual({ north: 6, south: 5, west: 0, east: 1 });
  });
});
