const Square = ({ id, value = "", onSquareClick, position }) => {
  return (
    <button
      className={`square${value ? ` player-${value.toString().toUpperCase()}` : ""}`}
      id={id}
      onClick={onSquareClick}
    >
        {position && !value ? <span className="position-index">{position}</span> : null}
      {value}
    </button>
  );
};

export default Square;
