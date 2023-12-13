import { useQuery } from "@tanstack/react-query";

export function useCoords() {
  return useQuery({
    queryKey: ["coords"],
    queryFn: async () => {
      const response = await fetch("https://staging-mortar-tech-test-2im2.encr.app/coordinates", { method: "POST" });
      const data = await response.json();
      return data;
    },
  });
}
