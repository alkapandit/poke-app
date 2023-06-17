import { Route, Routes } from "react-router-dom";
import PokemonApp from "./Components/PokemonApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<PokemonApp />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
