import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ThemeContext } from "../../../context/ThemeContext";
import { Outlet } from "react-router";

export const DashboardLayout = () => {
    const {theme, text} = React.useContext(ThemeContext);
  return (
    <>
      <div className={`layout w-full h-screen flex flex-col ${theme} ${text}`}>
        <Header />
        <div className="dashboard-content flex w-full h-full">
          <Sidebar />
          <main className="w-full px-10">
           { /*All childs components will be rendernd here*/}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
