import { Viewer, Entity, PolygonGraphics, Camera, PointGraphics } from "resium";
import { getCentre, getColor, getPositions } from "./utils";

type VisualisationProps = {
  areas?: Area[];
};

export function Visualisation({ areas = [] }: VisualisationProps) {
  return (
    <Viewer full>
      {areas?.map((area, i) => {
        return (
          <Entity key={area.name} position={getCentre(area)}>
            <PointGraphics pixelSize={10} />
            <PolygonGraphics hierarchy={getPositions(area)} material={getColor(i, areas.length)} />
          </Entity>
        );
      })}
      <Camera />
    </Viewer>
  );
}
