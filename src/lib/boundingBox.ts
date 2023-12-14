export function boundingBox(coords: Coordinate[]) {
  return {
    north: Math.max(...coords.map(({ latitude }) => latitude)),
    south: Math.min(...coords.map(({ latitude }) => latitude)),
    west: Math.min(...coords.map(({ longitude }) => longitude)),
    east: Math.max(...coords.map(({ longitude }) => longitude)),
  };
}
