import React from "react";
import RealmContextProvider from "../business/context/RealmContext";
import Home from "./pages/Home";

const App = () => {
  return (
    <RealmContextProvider>
      <Home />
    </RealmContextProvider>
  );
};

export default App;
