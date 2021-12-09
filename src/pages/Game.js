import Board from '../components/Board';
import {useEffect, useState} from 'react';
import {
  result,
  terminal,
  optimal_move,
} from '../utils/GameUtilities'
import Message from '../components/Message';
import Retry from '../components/Retry';
import {useLocation, useNavigate} from 'react-router-dom';
import BackButton from '../components/BackButton';

function Game() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedPlayer, setSelectedPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameEnded, setGameEnded] = useState(false);
  const [boardDisabled, setBoardDisabled] = useState(false);
  const [text, setText] = useState("Make a move");

  useEffect(() => {
    if (location.state !== null) {
      setSelectedPlayer(location.state.player);

      if (location.state.player === "O") {
        let boardCopy = [...board];
        computerMoveHandler(boardCopy);
      }
    }
  }, []);

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  async function moveHandler(i) {
    // Make move
    let boardCopy = [...board];
    boardCopy = result(boardCopy, i)
    setBoard(boardCopy);

    // Computer move
    if (!endGameHandler(boardCopy)) {
      setText("Exploring all possible states...");
      setBoardDisabled(true);
      await timeout(1000);
      setBoardDisabled(false);
      let boardComputerMove = computerMoveHandler(boardCopy);
      endGameHandler(boardComputerMove);
    }
  }

  function computerMoveHandler(board) {
    let [optimalMove, statesExplored] = optimal_move(board, location.state.useOptimisation);
    let boardComputerMove = result(board, optimalMove);
    setBoard(boardComputerMove);
    setText(`Explored ${statesExplored} states. Your turn now`);

    return boardComputerMove;
  }

  function startGameHandler() {
    const emptyBoard = Array(9).fill(null);
    setBoard(emptyBoard);
    setGameEnded(false);
    setText("Make your move");

    if (selectedPlayer === "O") {
      computerMoveHandler(emptyBoard);
    }
  }

  function endGameHandler(board) {
    if (terminal(board)) {
      setText("Game has ended")
      setGameEnded(true);

      return true;
    }

    return false;
  }

  function backButtonHandler() {
    navigate('/');
  }

  return (
    <div className="bg-gray-50">
      <BackButton onClick={backButtonHandler}/>
      <Message text={text}/>
      {!gameEnded ?
        !boardDisabled ?
          <Board board={board} onClick={moveHandler}/> :
          <Board board={board}/> :
        <>
          <Board board={board}/>
          <Retry onClick={startGameHandler}/>
        </>
      }
    </div>
  );
}

export default Game;