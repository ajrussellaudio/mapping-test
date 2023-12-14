import { Cartesian3, Color } from "cesium";
import { getCentre, getColor } from "./utils";

describe("getCentre", () => {
  it("returns the centre point of a given area", () => {
    const area = {
      name: "Testania",
      coords: [
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: 1 },
        { latitude: 1, longitude: 1 },
        { latitude: 1, longitude: 0 },
      ],
    } satisfies Area;
    expect(getCentre(area)).toEqual(Cartesian3.fromDegrees(0.5, 0.5, 100));
  });
});

describe("getColor", () => {
  it("returns the correct colour for the item's position in the list", () => {
    expect(getColor(0, 4)).toEqual(Color.GREEN);
    expect(getColor(1, 4)).toEqual(Color.ORANGE);
    expect(getColor(2, 4)).toEqual(Color.ORANGE);
    expect(getColor(3, 4)).toEqual(Color.RED);
    expect(getColor(99, 4)).toBeUndefined();
  });
});
