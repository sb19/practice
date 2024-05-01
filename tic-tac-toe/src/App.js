import Square from './components/square';
import { useState } from 'react';
import './App.css';


function Board({ squares, xTurn, onPlay }) {

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    let nextSquares = squares.slice();
    if (xTurn) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner is " + winner;
  }
  else if (xTurn) {
    status = "Next player: X";
  }
  else {
    status = "Next player: O";
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];
    for (let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i];
      if (squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <>
      <div className="board">
        <h1>{status}</h1>
        <div className="board-row">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xTurn = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const move = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    }
    else {
      description = "Go to game start";
    }
    return (
      <li key={move} >
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>);
  });

  function jumpTo(move) {
    setCurrentMove(move);
  }
  return (
    <>
      <div>
        <Board squares={currentSquares} xTurn={xTurn} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{move}</ol>
      </div>
    </>
  )

}

