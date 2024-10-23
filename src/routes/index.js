import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Checkout from "../pages/home/checkout";
import Login from "../pages/home/login";
import ProductDetail from "../pages/home/product";
import Product from "../pages/product";
import Register from "../pages/home/register";
import Order from "../pages/order";
import Category from "../pages/home/category";

const routes = [
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: Home,
    Layout: UserLayout,
  },
  {
    path: "/product/:id",
    Component: ProductDetail,
    Layout: UserLayout,
  },
  {
    path: "/products/:category",
    Component: Category,
    Layout: UserLayout,
  },
  {
    path: "/checkout",
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
  },
  {
    path: "/admin/orders",
    Component: Order,
    Layout: AdminLayout,
  }
];

export default routes;
