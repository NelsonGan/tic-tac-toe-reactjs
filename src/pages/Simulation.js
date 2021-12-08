import Message from '../components/Message';
import Board from '../components/Board';
import {useEffect, useState} from 'react';
import {optimal_move, result, terminal} from '../utils/GameUtilities';
import BackButton from '../components/BackButton';
import {useLocation, useNavigate} from 'react-router-dom';

function Simulation() {
  const navigate = useNavigate();
  const location = useLocation();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [text, setText] = useState("Click the button to begin simulation");
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [statesExplored, setStatesExplored] = useState(Array(9).fill(null));
  const [useOptimisation, setUseOptimisation] = useState(false);

  useEffect(() => {
    if (location.state !== null) {
      setUseOptimisation(location.state.useOptimisation);
    }
  }, [])

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  async function beginSimulationHandler() {
    setSimulationStarted(true);
    await computerMoveHandler(board);
  }

  async function computerMoveHandler(board) {
    if (terminal(board)) return;

    setText("Exploring all possible states...");
    await timeout(1500);
    let [optimalMove, statesExplored] = optimal_move(board, useOptimisation);
    let boardComputerMove = result(board, optimalMove);
    setBoard(boardComputerMove);
    setText(`Explored ${statesExplored} states.`);
    await timeout(500);

    return computerMoveHandler(boardComputerMove);
  }

  function backButtonHandler() {
    navigate('/');
  }

  return (
    <div>
      <BackButton onClick={backButtonHandler}/>
      <Message text={text}/>
      <Board board={board}/>
      {!simulationStarted &&
      <div className="mt-4 flex justify-center">
        <button onClick={() => beginSimulationHandler()}
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Begin simulation
        </button>
      </div>}

    </div>
  );
}

export default Simulation;