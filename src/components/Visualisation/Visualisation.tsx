export type VisualisationProps = {
  areas?: Area[];
};

export function Visualisation({ areas = [] }: VisualisationProps) {
  return <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(areas, null, 2)}</pre>;
}
