import "./App.scss";
import Main from "./components/MainPage/Main";
import Nav from "./components/Nav/Nav";
import PhotoList from "./components/PhotoList/PhotoList";

function App() {
  return (
    <>
      <Nav />
      <Main />
      <PhotoList />
    </>
  );
}

export default App;
