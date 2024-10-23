import { Route, Router, Routes } from "react-router-dom";
import Books from "./Page/Books.jsx";
import User from "./Page/User.jsx";
import Overview from "./Page/Overview.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />

      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/books" element={<Books />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
