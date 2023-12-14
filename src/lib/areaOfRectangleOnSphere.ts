import { boundingBox } from "./boundingBox";

export function areaOfShape(coords: Coordinate[]) {
  // This is wrong. It assumes a rectangle on planar surface,
  // not a polygon on a sphere (like a building on the Earth).
  // But this maths is easy and it's probably fine for a comparison.

  const { north, south, west, east } = boundingBox(coords);

  const length = Math.abs(east - west);
  const width = Math.abs(north - south);

  return length * width;
}
