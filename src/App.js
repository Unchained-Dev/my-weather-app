import React from "react";
import Header from "./component/Header/Header";
import Navbar from './component/Navbar/Navbar'
import Today from "./component/pages/Today/Today";
import Daily from "./component/pages/Daily/Daily";
import { Route, Routes } from "react-router";
import UserContextProvider from "./myContext";


export default function App(){

    return(
      <UserContextProvider>
        <div>
            <Header />
            <Navbar />
            <Routes>
              <Route path="/today" element={<Today />} />
              <Route path="/daily" element={<Daily />} />
            </Routes>
        </div>
      </UserContextProvider>     
    )
}