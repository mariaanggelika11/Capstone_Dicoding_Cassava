import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
    <Navbar />
    <div className="d-flex flex-column flex-md-row">
      <div
          style={{
          width: '16.6666%', // Bootstrap equivalent to Bulma's is-2 column
          padding: 0,
          position: 'fixed',
          left: 0,
          height: '100%',
          overflowY: 'auto'
        }}>
        <Sidebar />
      </div>
      <div
   
        style={{
          marginLeft: '16.6666%', // Adjusted to the sidebar width
          width: '100%' // Adjust to ensure the main content takes the remaining width
        }}>
        <main>{children}</main>
      </div>
    </div>
  </React.Fragment>
  );
};

export default Layout;
