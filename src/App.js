import "./App.css";
import MainStepper from "./components/stepper";

function clickHandler() {
  window.electron.send("click", "https://www.chess.com");
}

function App() {
  return (
    <div className="App">
      <MainStepper />
    </div>
  );
}

export default App;
