import Test from "./kustomDesign";

import "./App.css";
import UserPage from "./user";
import ArtistPage from "./artist";
import Register from "./register";
import ArtistProfilePage from "./artistProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./signIn";
import Home from "./Home";
import LandingPage from "./LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/image" element={<Test />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/artist" element={<ArtistPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/artistProfilePage:name" element={<ArtistProfilePage />} />
        <Route path="/artistProfilePage/:id" element={<ArtistProfilePage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
