import { useCoords } from "../hooks/useCoords";

export function Visualisation() {
  const { data, isLoading } = useCoords();
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</pre>
  );
}
