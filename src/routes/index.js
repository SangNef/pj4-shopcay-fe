import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Checkout from "../pages/home/checkout";
import Product from "../pages/product";

const routes = [
  {
    path: "/",
    Component: Home,
    Layout: UserLayout,
  },
  {
    path: "/checkout/:id",
    Component: Checkout,
    Layout: UserLayout,
  },
  {
    path: "/admin/",
    Component: Dashboard,
    Layout: AdminLayout,
  },
  {
    path: "/admin/products",
    Component: Product,
    Layout: AdminLayout,
  }
];

export default routes;
