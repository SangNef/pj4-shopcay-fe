import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/dashboard";
import Product from "../pages/product";

const routes = [
  {
    path: "/",
    Component: Dashboard,
    Layout: AdminLayout,
  },
  {
    path: "/products",
    Component: Product,
    Layout: AdminLayout,
  }
];

export default routes;
