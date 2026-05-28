import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateBlog from "./pages/CreateBlog";
import Navbar from "./components/Navbar";
import EditBlog from "./pages/EditBlog";
import BlogDetails from "./pages/BlogDetails";  
import MyBlogs from "./pages/MyBlogs";
import Profile from "./pages/Profile";  
function App() {
  return (
   <BrowserRouter>

  <Navbar />

  <Routes>

    <Route
      path="/"
      element={<Home />}
    />

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/signup"
      element={<Signup />}
    />

    <Route
      path="/create-blog"
      element={<CreateBlog />}
    />

    <Route
      path="/edit-blog/:id"
      element={<EditBlog />}
    />

    <Route
      path="/blogs/:id"
      element={<BlogDetails />}
    />

    <Route
      path="/my-blogs"
      element={<MyBlogs />}
    />

    <Route
      path="/profile"
      element={<Profile />}
    />

  </Routes>

</BrowserRouter>
  );
}

export default App;