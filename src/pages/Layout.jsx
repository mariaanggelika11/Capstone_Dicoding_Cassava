import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
    <Navbar />
    <div className="d-flex mt-5" style={{ minHeight: "100vh" }}>
      <div
        className="bg-light"
        style={{
          width: '16.6666%', // Bootstrap equivalent to Bulma's is-2 column
          padding: 0,
          position: 'fixed',
          top: '80px',
          left: 0,
          height: '100vh',
          overflowY: 'auto'
        }}>
        <Sidebar />
      </div>
      <div
        className="flex-grow-1"
        style={{
          marginLeft: '16.6666%', // Adjusted to the sidebar width
          width: '83.3333%' // Adjust to ensure the main content takes the remaining width
        }}>
        <main className="bg-light">{children}</main>
      </div>
    </div>
  </React.Fragment>
  );
};

export default Layout;
