import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useCoords } from "./useCoords";
import mockCoordsResponse from "../mocks/responses/coords.json";

const client = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

describe("useCoords", () => {
  it("returns the coordinates", async () => {
    const { result } = renderHook(useCoords, { wrapper });
    await waitFor(() => {
      const { isSuccess, data } = result.current;
      expect(isSuccess).toEqual(true);
      expect(data).toEqual(mockCoordsResponse);
    });
  });
});
