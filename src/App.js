import { useState } from "react";
import "./App.css";
import Board from "./components/board/board";
import Header from "./components/header/header";

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  return (
    <>
      <Header />
      <h1 className="center">Tic Tac Toe AI</h1>

      <Board xIsNext={xIsNext} squares={currentSquares} />
    </>
  );
}

export default App;
