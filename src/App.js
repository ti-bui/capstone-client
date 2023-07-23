import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
//pages
import HomePage from "./pages/HomePage";
import PhotoDetails from "./components/PhotoDetails/PhotoDetails";
import About from "./components/About/About";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <AnimatePresence
        //  initial={false}
        wait
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/:id" element={<PhotoDetails />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
