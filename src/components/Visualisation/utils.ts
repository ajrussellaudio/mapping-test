import { Cartesian3, Color } from "cesium";

export function getPositions(area: Area) {
  return area.coords.map(({ latitude, longitude }) => Cartesian3.fromDegrees(longitude, latitude, 100));
}

export function getCentre(area: Area) {
  const minLat = Math.min(...area.coords.map((coord) => coord.latitude));
  const maxLat = Math.max(...area.coords.map((coord) => coord.latitude));
  const minLong = Math.min(...area.coords.map((coord) => coord.longitude));
  const maxLong = Math.max(...area.coords.map((coord) => coord.longitude));
  const centre = {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLong + maxLong) / 2,
  };

  return Cartesian3.fromDegrees(centre.longitude, centre.latitude, 100);
}

export function getColor(index: number, length: number) {
  if (index > length) return;

  switch (index) {
    case 0: {
      return Color.GREEN;
    }
    case length - 1: {
      return Color.RED;
    }
    default: {
      return Color.ORANGE;
    }
  }
}
