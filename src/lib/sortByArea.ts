import { areaOfShape } from "./areaOfRectangleOnSphere";

export function sortByArea(areas: Area[]) {
  const copy = [...areas];
  copy.sort((a, b) => areaOfShape(b.coords) - areaOfShape(a.coords));
  return copy;
}
