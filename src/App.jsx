import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Posts/Landing";
import Loader from "./components/Posts/Loader";
import ProtectedRoute from "./components/Redirects/ProtectedRoute";
// import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SinglePost from "./pages/SinglePost";

const CreatePost = React.lazy(() => import("./pages/CreatePost"));
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              state="isLoginCompleted"
              componentName="Unauthorized"
            >
              <Posts />
            </ProtectedRoute>
          }
        >
          <Route index element={<Landing />} />
          <Route
            path="createPost"
            element={
              <Suspense fallback={<Loader />}>
                <CreatePost />
              </Suspense>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path=":id" element={<SinglePost />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
