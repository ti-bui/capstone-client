import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import PhotoDetails from "./components/PhotoDetails/PhotoDetails";
import About from "./components/About/About";
import ScrollToTopOnRouteChange from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence initial={false} wait>
        <ScrollToTopOnRouteChange />
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
