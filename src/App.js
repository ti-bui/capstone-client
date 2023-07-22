import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PhotoDetails from "./components/PhotoDetails/PhotoDetails";
import About from "./components/About/About";
import Nav from "./components/Nav/Nav";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/:id" element={<PhotoDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
