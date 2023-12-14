import { sortByArea } from "./sortByArea";

describe("sortByArea", () => {
  it("sorts a list of Areas by... area", () => {
    const big: Area = {
      name: "Gigantica", // 10 * 10
      coords: [
        { latitude: 10, longitude: 10 },
        { latitude: 10, longitude: 0 },
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: 10 },
      ],
    };

    const medium: Area = {
      name: "Medio", // 1 * 1
      coords: [
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: 1 },
        { latitude: 1, longitude: 1 },
        { latitude: 1, longitude: 0 },
      ],
    };

    const small: Area = {
      name: "Miniscovia", // 0.1 * 0.1
      coords: [
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: 0.1 },
        { latitude: 0.1, longitude: 0.1 },
        { latitude: 0.1, longitude: 0 },
      ],
    };

    expect(sortByArea([medium, small, big])).toEqual([big, medium, small]);
  });
});
