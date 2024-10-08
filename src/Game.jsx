import { useState } from "react";
import Board from "./components/board/board";
import { calculateWinner } from "./utils/game";
import WebCam from "./components/webcam/webcam";

let timer = {};

const Game = () => {
  const [status, setStatus] = useState("stop");
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const newGame = () => {
    setStatus("play");
  };

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const winner = calculateWinner(currentSquares);
  const tie = !winner && currentMove >= 9;

  const handleClick = (i) => {
    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }
    const nextSquares = currentSquares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    handlePlay(nextSquares);
  };

  const onSquareDetected = (squareId) => {
    if (!squareId) {
      clearTimeout(timer?.id);
    }
    const squares = [
      document.getElementById("square-1"),
      document.getElementById("square-2"),
      document.getElementById("square-3"),
      document.getElementById("square-4"),
      document.getElementById("square-5"),
      document.getElementById("square-6"),
      document.getElementById("square-7"),
      document.getElementById("square-8"),
      document.getElementById("square-9"),
    ];
    squares.forEach((square) => {
      if (square?.id === squareId) {
        document.getElementById(square.id).classList.add("square-hover");
        const squareN = Number(squareId.slice(-1) - 1);
        if (timer.square !== squareN) {
          clearTimeout(timer.id);
          timer.square = squareN;
          timer.id = setTimeout(() => {
            handleClick(squareN);
          }, 3000);
        }
      } else {
        document.getElementById(square.id).classList.remove("square-hover");
      }
    });
  };

  return (
    <>
      {status === "play" ? (
        <>
          <div className="center your-turn">
            {xIsNext ? "It's your turn" : null}
          </div>
          <div className="board-container" id="boardContainer">
            <Board
              autoPlay={!winner}
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handleClick}
            />
            <WebCam hide={!xIsNext} onSquareDetected={onSquareDetected} />
          </div>
        </>
      ) : null}

      {status === "stop" ? (
        <div className="game-stop">
          <div className="rules">
            <h4>Rules</h4>
            <ol>
              <li>
                You are <span className="bold">X</span>, the computer is
                <span className="bold">O</span>. Players take turns putting
                their marks in empty squares.
              </li>
              <li>
                The first player to get 3 of his marks in a row (up, down,
                across, or diagonally) is the winner.
              </li>
              <li>
                When all 9 squares are full, the game is over. If no player has
                3 marks in a row, the game ends in a tie.
              </li>
            </ol>
            <h4>How To Play</h4>
            <ul>
              <li>
                When is your turn, click on the square you want to place your
                move
              </li>
              <li>
                Playing from a desktop browser enable you to play using your
                hands: just move your hands in front of the camera and the
                integrated AI will starts to track your fingers, then you just
                have to place your index onto the square you want to place your
                move!
              </li>
            </ul>
          </div>
          <button onClick={newGame}>New Game</button>
        </div>
      ) : null}

      {winner || tie ? (
        <div
          className={`announcement${winner ? " winner" : tie ? " tie" : ""}`}
        >
          <h2 className={winner ? `player-${winner.toUpperCase()}` : null}>
            {winner ? (
              <>{winner} is the winner!</>
            ) : tie ? (
              <>It's a tie, nice match!</>
            ) : null}
          </h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : null}
    </>
  );
};

export default Game;
