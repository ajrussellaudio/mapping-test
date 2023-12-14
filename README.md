# Mapping Tech Test

This is a code test submission for a company who probably don't want this appearing on a Google search. Rhymes with Quarter.

## Running locally

```bash
$ npm install
$ npm run dev
```

Visit http://localhost:5173/

Or run tests:

```bash
$ npm test
```

## Notes

I spent longer than the suggested two hours on this, and it still doesn't meet the brief. There are no buttons to switch between the buildings. The areas are coloured correctly, and can be viewed by zooming in manually on San Francisco, Paris and Nairobi.

Most of my time was burned on:

- Transforming the data fetched from the API
- Sorting the areas by size to assign colours
- Learning how to use Cesium (and its React sibling Resium) for mapping

### Data wrangling

The API and the shape of its data seemed unusual choices to me. We're making a `POST` request but not posting any data. The response data looks like

```json
{
  "Coords": {
    "Africa": [
      { "latitude": 0.123, "longitude": 1.234 }
      // ...
    ],
    "Europe": [
      // ...
    ]
    // ...
  }
}
```

I would expect the list of areas to be an array of objects, with each object containing a `name` property:

```json
[
  {
    "name": "Africa",
    "coords": [
      { "latitude": 0.123, "longitude": 1.234 }
      // ...
    ]
  },
  {
    "name": "Europe",
    "coords": [
      // ...
    ]
  }
  // ...
]
```

In the real world I'd have a conversation with the API code owner about this, but for the sake of the tech test I transformed the data to how I wanted it in `src/lib/transformCoordsResponse.ts` with a test.

### Sorting the areas

In order to colour the areas on the map my approach was to sort the areas by size, then assigning the colours to the first item in the array (largest) and last item (smallest). I fell down a rabbit hole with calculating the area of a polygon on a sphere - the areas in the current API are all rectangles but I don't think it's safe to assume that all buildings or plots of land have a rectangular footprint. After far too much time spent on the maths of it I instead calculated the size of the area's bounding box. It's not accurate but I think it's fine for comparison of sizes.

I think the best real-world solution here would be for the backend to do the tough maths of calculating the area of a set of coordinates, then add an `area: number` field in the response which the UI can use to sort the areas much more simply. Again, for the sake of the test I implemented it in the UI, in `src/lib/sortByArea.ts` with its dependencies and tests.

### Cesium/Resium

Cesium seems really cool, with a bit of a learning curve that I didn't have time to dig into properly. Resium seems a little underdeveloped by comparison, certainly underdocumented. I spent a lot of time Googling how to do what I wanted, even digging into the source code to figure out how a thing works, even for simple things like drawing a polygon. "Is it `Polygon` or `PolygonGraphics` or `PolygonHierarchy` that I want? Ok it's definitely `PolygonGraphics` but I'm not seeing it. Oh wait, I was drawing the polygon the whole time, but beneath the surface of the Earth..." 🤦‍♂️

I like to write a lot more tests of my components than I've written here. Unfortunately Cesium relies on WebGL, which is not implemented by `jsdom`, the browser-like environment used in my tests. There are WebGL mocks out there in the community, but I didn't try any of them in this.

## Next steps

It's frustrating that I didn't have time to add the buttons to select different areas. The React code would be simple enough in theory:

```tsx
export function App(props: AppProps) {
  const [selectedThing, setSelectedThing] = useState<Thing | null>(null);

  const handleThingSelection = (thingSelection: Thing) => {
    setSelectedThing(thingSelection);
  };

  return (
    <>
      <ThingDisplay thing={selectedThing} />
      <ThingSelector things={props.things} onChange={handleThingSelection} />
    </>
  );
}
```

The sticking point for me was not knowing how Cesium/Resium handles "selected" entities, or how Resium in particular would be able to "fly" the camera between points when they are selected. With another couple of hours at this task, I'm sure I would have figured it out.

## Technologies

- [React](https://react.dev) for building the UI
- [TypeScript](https://www.typescriptlang.org/) for my own sanity
- [Vite](https://vitejs.dev/) to bootstrap a React app quickly
- [Vitest](https://vitest.dev/) for testing in Vite
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for writing tests for React components and hooks
- [React Query](https://tanstack.com/query/v3/docs/react/overview) for managing fetched data in state
- [Mock Service Worker (MSW)](https://mswjs.io/) to mock the API responses and errors in tests
- [Cesium](https://cesium.com/) for drawing the 3D map
- [Resium](https://resium.reearth.io/) for using Cesium in React
