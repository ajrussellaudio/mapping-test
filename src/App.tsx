import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Visualisation } from "./components/Visualisation";

const client = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <Visualisation />
      </QueryClientProvider>
    </>
  );
}

export default App;
