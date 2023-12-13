type Coordinate = {
  latitude: number;
  longitude: number;
};

type CoordinatesResponseDto = { Coords: Record<string, Coordinate[]> };

type Area = {
  name: string;
  coords: Coordinate[];
};
