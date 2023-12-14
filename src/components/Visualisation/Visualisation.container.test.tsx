import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { VisualisationContainer } from "./Visualisation.container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { server } from "../../mocks/server";
import mockCoordsResponse from "../../mocks/responses/coords.json";

vi.mock("./Visualisation", () => ({
  Visualisation: ({ areas }: { areas: Area[] }) => {
    return (
      <>
        {areas.map((area) => (
          <span key={area.name} data-testid="area">
            {area.name}
          </span>
        ))}
      </>
    );
  },
}));

const renderComponent = (props: Partial<ComponentProps<typeof VisualisationContainer>> = {}) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(
    <QueryClientProvider client={client}>
      <VisualisationContainer {...props} />
    </QueryClientProvider>,
  );
};

describe("Visualisation.container", () => {
  it("shows a loading message", () => {
    renderComponent();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays the fetched areas", async () => {
    server.use(
      http.post("https://staging-mortar-tech-test-2im2.encr.app/coordinates", () => {
        return HttpResponse.json(mockCoordsResponse);
      }),
    );
    renderComponent();
    expect(await screen.findAllByTestId("area")).toHaveLength(Object.entries(mockCoordsResponse.Coords).length);
  });

  it("shows an error when the query fails", async () => {
    server.use(
      http.post("https://staging-mortar-tech-test-2im2.encr.app/coordinates", () => {
        return HttpResponse.json(
          {
            code: "unknown",
            message: "could not do the thing",
            details: null,
          } satisfies CoordinatesFailureResponseDto,
          { status: 500 },
        );
      }),
    );
    renderComponent();
    expect(await screen.findByText("could not do the thing")).toBeInTheDocument();
  });
});
