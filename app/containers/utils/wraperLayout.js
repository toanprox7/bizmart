import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch } from 'react-router-dom'
import Layout from "../Layout";
import {SideBarLayout,ProductsLayout,PostNewLayout} from "../Layout";
import BannerMain from "../../components/banner/BannerMain";
import {Layout as LayoutAdmin} from "../../admin/containers/Layout" ;

export const ClientRoute = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={matchProps => (
        <Layout {...matchProps}>
          
            <Component {...matchProps} />
        </Layout>
      )} />
    )
  };
  export const SideBarRoute = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={matchProps => (
        <Layout {...matchProps}>
        <BannerMain {...matchProps} />
            <SideBarLayout {...matchProps}>
            <Component {...matchProps} />
            </SideBarLayout>
        </Layout>
      )} />
    )
  };
  export const ProductRoute = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={matchProps => (
        <Layout {...matchProps}>
          <BannerMain {...matchProps} />
            <ProductsLayout {...matchProps}>
            <Component {...matchProps} />
            </ProductsLayout>
        </Layout>
      )} />
    )
  };
  export const PostNewRoute = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={matchProps => (
        <Layout>
            <PostNewLayout {...matchProps}>
            <Component {...matchProps} />
            </PostNewLayout>
        </Layout>
      )} />
    )
  };
  export const AdminRoute = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={matchProps => (
        <LayoutAdmin {...matchProps}>
            <Component {...matchProps} />
        </LayoutAdmin>
      )} />
    )
  };
 