import { useEffect } from "react";
import { calculateWinner } from "../../utils/game";
import Square from "../square/square";

const Board = ({ xIsNext, squares, onPlay, autoPlay }) => {
  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };

  function randomNumber(max = 8, min = 0) {
    return Math.floor(Math.random() * max) + min;
  }

  useEffect(() => {
    if (autoPlay && !xIsNext) {
      setTimeout(() => {
        let check = true;
        while (check) {
          const randomMove = randomNumber();
          if (!squares[randomMove]) {
            handleClick(randomMove);
            check = false;
          }
        }
      }, randomNumber(3000, 1500));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares]);

  return (
    <>
      <div className="center your-turn">{xIsNext ? "It's your turn" : null}</div>
      <div className="board glass" id="board">
        {squares.map((s, i) => (
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
            position={i + 1}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
