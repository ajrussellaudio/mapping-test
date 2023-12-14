import { useCoords } from "../../hooks/useCoords";
import { Visualisation } from "./Visualisation";

export function VisualisationContainer() {
  const { data, isLoading, isError, error } = useCoords();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{error.message}</span>;
  }

  return <Visualisation areas={data} />;
}
