const Square = ({ value, onSquareClick }) => {
  return (
    <button
      className={`square${value ? ` player-${value.toUpperCase()}` : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

export default Square;
