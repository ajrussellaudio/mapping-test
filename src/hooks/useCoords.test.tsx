import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useCoords } from "./useCoords";
import { server } from "../mocks/server";
import { HttpResponse, http } from "msw";

const client = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

describe("useCoords", () => {
  it("returns the coordinates", async () => {
    server.use(
      http.post("https://staging-mortar-tech-test-2im2.encr.app/coordinates", () => {
        return HttpResponse.json({
          Coords: {
            Wakanda: [
              { latitude: 0, longitude: 0 },
              { latitude: 2, longitude: 2 },
            ],
          },
        } satisfies CoordinatesResponseDto);
      }),
    );
    const { result } = renderHook(useCoords, { wrapper });
    await waitFor(() => {
      const { isSuccess, data } = result.current;
      expect(isSuccess).toEqual(true);
      expect(data).toEqual([
        {
          name: "Wakanda",
          coords: [
            { latitude: 0, longitude: 0 },
            { latitude: 2, longitude: 2 },
          ],
        },
      ]);
    });
  });
});
