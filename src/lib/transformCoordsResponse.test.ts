import { transformCoordsResponse } from "./transformCoordsResponse";

describe("transformCoordsResponse", () => {
  it("turns the coordinates API response into a list of Areas", () => {
    const response = {
      Coords: {
        Wakanda: [
          { latitude: 0, longitude: 0 },
          { latitude: 0, longitude: 1 },
          { latitude: 1, longitude: 1 },
          { latitude: 1, longitude: 0 },
        ],
        Latveria: [
          { latitude: -10, longitude: -10 },
          { latitude: -10, longitude: 0 },
          { latitude: 0, longitude: 0 },
          { latitude: 0, longitude: -10 },
        ],
      },
    } satisfies CoordinatesResponseDto;
    const expected = [
      {
        name: "Wakanda",
        coords: [
          { latitude: 0, longitude: 0 },
          { latitude: 0, longitude: 1 },
          { latitude: 1, longitude: 1 },
          { latitude: 1, longitude: 0 },
        ],
      },
      {
        name: "Latveria",
        coords: [
          { latitude: -10, longitude: -10 },
          { latitude: -10, longitude: 0 },
          { latitude: 0, longitude: 0 },
          { latitude: 0, longitude: -10 },
        ],
      },
    ] satisfies Area[];
    expect(transformCoordsResponse(response)).toEqual(expected);
  });
});
