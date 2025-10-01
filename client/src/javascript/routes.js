
import React from "react";
import { Switch, Route } from "react-router-dom";

import UserRoute from "./routing/UserRoute";
import AdminRoute from "./routing/AdminRoute";
import GuestRoute from "./routing/GuestRoute";
import GuestAdminRoute from "./routing/GuestAdminRoute";

// General
import HomePage from "./pages/general/HomePage";
import ErrorPage from "./pages/general/ErrorPage";
import SignInPage from "./pages/general/SignInPage";
import SignUpPage from "./pages/general/SignUpPage";
import PasswordPage from "./pages/general/PasswordPage";

import UserHomePage from "./pages/user/UserHomePage";

// Admin App
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminSigninPage from "./pages/admin/AdminSignInPage";
import AdminSignupPage from "./pages/admin/AdminSignUpPage";

import BlocksListPage from "./pages/admin/blocks/BlocksListPage";
import BlocksCreatePage from "./pages/admin/blocks/BlocksCreatePage";

import OrdersReadPage from "./pages/general/orders/OrdersReadPage";
import OrdersListPage from "./pages/general/orders/OrdersListPage";

import AdminOrdersListPage from "./pages/admin/orders/OrdersListPage";
import AdminOrdersUpdatePage from "./pages/admin/orders/OrdersUpdatePage";

import ProductsListPage from "./pages/admin/products/ProductsListPage";
import ProductsReadPage from "./pages/admin/products/ProductsReadPage";
import productsCreatePage from "./pages/admin/products/ProductsCreatePage";
import productsUpdatePage from "./pages/admin/products/ProductsUpdatePage";

import ColorsListPage from "./pages/admin/products/colors/ColorsListPage";

import SettingsHomePage from "./pages/admin/settings/SettingsHomePage";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />

      <Route exact path="/signup" component={SignUpPage} />
      <GuestRoute exact path="/signin" component={SignInPage} />
      <GuestRoute exact path="/password" component={PasswordPage} />

      <UserRoute exact path="/user/home" component={UserHomePage} />

      <UserRoute exact path="/orders" component={OrdersListPage} />
      <UserRoute exact path="/orders/:id" component={OrdersReadPage} />

      <GuestAdminRoute exact path="/cp" component={AdminSigninPage} />
      <GuestAdminRoute exact path="/cp/signup" component={AdminSignupPage} />
      
      <AdminRoute exact path="/cp/index" component={AdminHomePage} />

      <AdminRoute exact path="/cp/blocks" component={BlocksListPage} />
      <AdminRoute exact path="/cp/blocks/create" component={BlocksCreatePage} />

      <AdminRoute exact path="/cp/orders" component={AdminOrdersListPage} />
      <AdminRoute exact path="/cp/orders/:id" component={AdminOrdersUpdatePage} />

      <AdminRoute exact path="/cp/products" component={ProductsListPage} />
      <AdminRoute exact path="/cp/products/create" component={productsCreatePage} />
      <AdminRoute exact path="/cp/products/:id" component={ProductsReadPage} />
      <AdminRoute exact path="/cp/products/:id/update" component={productsUpdatePage} />
      <AdminRoute exact path="/cp/products/:id/colors" component={ColorsListPage} />

      <AdminRoute exact path="/cp/settings" component={SettingsHomePage} />

      <Route component={ErrorPage} />
    </Switch>
  );
}

export default Routes;
