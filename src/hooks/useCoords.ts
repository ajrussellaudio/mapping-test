import { useQuery } from "@tanstack/react-query";
import { transformCoordsResponse } from "../lib/transformCoordsResponse";

export function useCoords() {
  return useQuery({
    queryKey: ["coords"],
    queryFn: async () => {
      const response = await fetch("https://staging-mortar-tech-test-2im2.encr.app/coordinates", { method: "POST" });
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      const data = await response.json();
      return transformCoordsResponse(data);
    },
  });
}
