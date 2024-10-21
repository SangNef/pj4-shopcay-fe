// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((item) => {
          const { path, Component, Layout } = item;
          const RouteComponent = Layout ? (
            <Layout>
              <Component />
            </Layout>
          ) : (
            <Component />
          );

          return (
            <Route key={path} path={path} element={RouteComponent} />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
