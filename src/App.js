import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {routes.map((item) => {
            const { path, Component, Layout } = item;
            return (
              <Route
                key={path}
                path={path}
                element={<Layout><Component /></Layout>}
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
