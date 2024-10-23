import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./Page/Dashboard.jsx";
import Header from "./components/Header.jsx";
import Books from "./Page/Books.jsx";
import User from "./Page/User.jsx";
import Login from "./Page/Login.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        if(user.isAuthenticated ){<Route path="/login" element={<Login />} />}
        else{<Route path="/login" element={<Register />} />}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </>
  );
}

export default App;
