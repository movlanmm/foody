import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Restourant from "../pages/restourant/Restourant";
import RestourantLayout from "../layouts/RestourantLayout";
import Home from "../pages/client/Home";
import Shop from "../pages/client/Shop";
import ProductSingle from "../pages/client/ProductSingle";
import Cart from "../pages/client/Cart";
import Register from "../pages/client/Register";
import RegisterRestourant from "../pages/client/RegisterRestourant";
import Checkout from "../pages/client/Checkout";
import RestourantDetails from "../pages/client/RestourantDetails";
import AddProduct from "../pages/restourant/AddProduct";
import EditProduct from "../pages/restourant/EditProduct";
import Success from "../pages/client/Success";
import Orders from "../pages/client/Orders";
import Contact from "../pages/client/Contact";
import About from "../pages/client/About";
import Login from "../pages/client/Login";
import AdminLayout from "../layouts/AdminLayout";
import Admin from "../pages/admin/Admin";
import Restourants from "../pages/admin/Restourants";
import AdminOrders from "../pages/admin/Orders";
import Products from "../pages/admin/Products";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "/shop",
    element: (
      <MainLayout>
        <Shop />
      </MainLayout>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <MainLayout>
        <ProductSingle />
      </MainLayout>
    ),
  },
  {
    path: "/cart",
    element: (
      <MainLayout>
        <Cart />
      </MainLayout>
    ),
  },
  {
    path: "/checkout",
    element: (
      <MainLayout>
        <Checkout />
      </MainLayout>
    ),
  },
  {
    path: "/orders",
    element: (
      <MainLayout>
        <Orders />
      </MainLayout>
    ),
  },
  {
    path: "/order/:id",
    element: (
      <MainLayout>
        <Success />
      </MainLayout>
    ),
  },
  {
    path: "/contact",
    element: (
      <MainLayout>
        <Contact />
      </MainLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <MainLayout>
        <About />
      </MainLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <MainLayout>
        <Login />
      </MainLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <MainLayout>
        <Register />
      </MainLayout>
    ),
  },
  {
    path: "/register-restourant",
    element: (
      <MainLayout>
        <RegisterRestourant />
      </MainLayout>
    ),
  },
  {
    path: "/restourant/:id",
    element: (
      <MainLayout>
        <RestourantDetails />
      </MainLayout>
    ),
  },
  {
    path: "/restourant/dashboard",
    element: (
      <RestourantLayout>
        <Restourant />
      </RestourantLayout>
    ),
  },
  {
    path: "/restourant/dashboard/add-product",
    element: (
      <RestourantLayout>
        <AddProduct />
      </RestourantLayout>
    ),
  },
  {
    path: "/restourant/dashboard/edit-product/:id",
    element: (
      <RestourantLayout>
        <EditProduct />
      </RestourantLayout>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminLayout>
        <Admin />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/dashboard/restourants",
    element: (
      <AdminLayout>
        <Restourants />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/dashboard/orders",
    element: (
      <AdminLayout>
        <AdminOrders />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/dashboard/products",
    element: (
      <AdminLayout>
        <Products />
      </AdminLayout>
    ),
  },
]);
