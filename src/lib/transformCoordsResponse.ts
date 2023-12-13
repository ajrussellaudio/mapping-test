export function transformCoordsResponse(response: CoordinatesResponseDto): Area[] {
  return Object.entries(response.Coords).map(([name, coords]) => ({ name, coords }));
}
