import { sortByArea } from "./sortByArea";

export function transformCoordsResponse(response: CoordinatesSuccessResponseDto): Area[] {
  const areas = Object.entries(response.Coords).map(([name, coords]) => ({ name, coords }));
  return sortByArea(areas);
}
