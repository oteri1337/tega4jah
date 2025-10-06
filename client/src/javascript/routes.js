
import React from "react";
import { Switch, Route } from "react-router-dom";

import UserRoute from "./routing/UserRoute";
import AdminRoute from "./routing/AdminRoute";
import GuestRoute from "./routing/GuestRoute";
import GuestAdminRoute from "./routing/GuestAdminRoute";

import HomePage from "../app/index";
import ProductsReadPage from "../app/products/[id]";
import ErrorPage from "./pages/general/ErrorPage";

import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminSigninPage from "./pages/admin/AdminSignInPage";
import AdminSignupPage from "./pages/admin/AdminSignUpPage";

import ProductsListPage from "./pages/admin/products/ProductsListPage";
import productsCreatePage from "./pages/admin/products/ProductsCreatePage";
import productsUpdatePage from "./pages/admin/products/ProductsUpdatePage";
import ProductsColorsListPage from "./pages/admin/products/colors/ColorsListPage";

import UsersListPage from "./pages/admin/users/UsersListPage";
import UsersReadPage from "./pages/admin/users/UsersReadPage";


function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/products/:id" component={ProductsReadPage} />

      <GuestAdminRoute exact path="/cp" component={AdminSigninPage} />
      <GuestAdminRoute exact path="/cp/signup" component={AdminSignupPage} />
      
      <AdminRoute exact path="/cp/index" component={AdminHomePage} />

      <AdminRoute exact path="/cp/users" component={UsersListPage} />
      <AdminRoute exact path="/cp/users/:id" component={UsersReadPage} />

      <AdminRoute exact path="/cp/products" component={ProductsListPage} />
      <AdminRoute exact path="/cp/products/create" component={productsCreatePage} />
      <AdminRoute exact path="/cp/products/:id" component={ProductsReadPage} />
      <AdminRoute exact path="/cp/products/:id/update" component={productsUpdatePage} />
      <AdminRoute exact path="/cp/products/:id/colors" component={ProductsColorsListPage} />

      <Route component={ErrorPage} />
    </Switch>
  );
}

export default Routes;
