import { HttpResponse, http } from "msw";
import response from "./responses/coords.json";

export const handlers = [
  http.post("https://staging-mortar-tech-test-2im2.encr.app/coordinates", () => {
    return HttpResponse.json(response);
  }),
];
