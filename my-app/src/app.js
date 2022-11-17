import './App.css';
import CreateGame from './CreateGame';
import Test from './kustomDesign';
import Login from './login';

import UserPage from './user';
import ArtistPage from './artist';
import Register from './register';
import ArtistProfilePage from './artistProfilePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
    <Route path="/" element={<CreateGame />}/>
    <Route path="/image" element={<Test/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/user" element={<UserPage/>}/>
    <Route path="/artist" element={<ArtistPage/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/artistProfilePage:name" element={<ArtistProfilePage/>}/>
    <Route path="/artistProfilePage:id" element={<ArtistProfilePage/>}/>
    </Routes>
      </BrowserRouter>

  );
}

export default App;
