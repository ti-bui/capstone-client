import "./App.scss";
import About from "./components/About/About";
import Main from "./components/Main/Main";
import Nav from "./components/Nav/Nav";
import PhotoDetails from "./components/PhotoDetails/PhotoDetails";
import PhotoList from "./components/PhotoList/PhotoList";

function App() {
  return (
    <>
      <Nav />
      {/* <Main /> */}
      {/* <PhotoList /> */}
      {/* <About /> */}
      <PhotoDetails />
    </>
  );
}

export default App;
