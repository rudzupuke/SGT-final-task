import "./App.scss";
// import data from "./dummyData";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import DashBoard from "./pages/DashBoard/DashBoard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isOnHomePage, setIsOnHomePage] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home isOnHomePage={isOnHomePage} user={user} />}
        />
        <Route
          path="/dashboard"
          element={
            <DashBoard
              isOnHomePage={isOnHomePage}
              setIsOnHomePage={setIsOnHomePage}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
