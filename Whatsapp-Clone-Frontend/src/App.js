import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages import
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

import { io } from "socket.io-client";
import SocketContext from "./context/SocketContext";
import { useSelector } from "react-redux";

const socket = io(process.env.REACT_APP_API_ENDPOINT.split("/api/v1")[0]);

function App() {
  const { user } = useSelector((state) => state.user);
  const token = user?.token; // safe optional chaining

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={token ? <Home socket={socket} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!token ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
