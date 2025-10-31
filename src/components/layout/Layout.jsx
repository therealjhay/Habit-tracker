import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div className="app-layout">
    <Sidebar />
    <div className="main-content">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  </div>
);

export default Layout;
