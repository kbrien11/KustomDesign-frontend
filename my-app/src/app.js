import "./App.css";
import UserPage from "./user";
import ArtistPage from "./components/Artist/artist";
import Register from "./components/validation/register";
import ArtistProfilePage from "./components/Artist/artistProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/validation/signIn";
import Home from "./Home";
import LandingPage from "./LandingPage";
import ImageUpload from "./components/Image/ImageUpload";
import ExplortArtist from "./components/Artist/ExploreArtist";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/image" element={<ImageUpload />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/artist" element={<ArtistPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<ExplortArtist />} />
        <Route path="/artistProfilePage:name" element={<ArtistProfilePage />} />
        <Route path="/artistProfilePage/:id" element={<ArtistProfilePage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
