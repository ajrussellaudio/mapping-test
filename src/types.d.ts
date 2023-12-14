type Coordinate = {
  latitude: number;
  longitude: number;
};

type CoordinatesSuccessResponseDto = { Coords: Record<string, Coordinate[]> };

type CoordinatesFailureResponseDto = {
  code: string | number; // e.g. 500 or "unknown"
  message: string;
  details: unknown | null;
};

type Area = {
  name: string;
  coords: Coordinate[];
};
