import { useEffect, useState } from "react";
import Board from "./components/board/board";
//import Video from "./components/video/video";
import { calculateWinner } from "./utils/game";
import { getHands } from "./ai/handPoseAI";

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

  const retireveHands = async () => {
    try {
      const video = document.querySelector("#videoElement");
      if (video) {
        const hands = await getHands();
        console.log("hands", hands);
        hands.forEach(hand => {
            console.log(hand.handedness, hand.keypoints.find(keypoint => keypoint.name === "index_finger_tip"));
        })
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (xIsNext) {
      retireveHands();
    }
  }, [xIsNext]);

  return (
    <>
      {status === "play" ? (
        <>
          <Board
            autoPlay={!winner}
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
          {/*<Video hide={!xIsNext} squares={currentSquares} />*/}
        </>
      ) : null}

      {status === "stop" ? (
        <div className="game-stop">
          <div className="rules">
            <h4>Rules</h4>
            <ol>
              <li>
                You are <span className="bold">X</span>, the computer is{" "}
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
