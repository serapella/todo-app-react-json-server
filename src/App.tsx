import { Layout } from "./components/Layout";
import { TodoPage } from "./pages/todoPage";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Layout>
        <TodoPage />
      </Layout>
      <Toaster richColors closeButton position="top-right" />
      {/* https://sonner.emilkowal.ski/ */}
    </>
  );
}

export default App;
