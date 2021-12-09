import Message from '../components/Message';
import Board from '../components/Board';
import {useEffect, useReducer, useState} from 'react';
import {min_value, optimal_move, result, terminal} from '../utils/GameUtilities';
import BackButton from '../components/BackButton';
import {useLocation, useNavigate} from 'react-router-dom';
import MovesProgress from '../components/MovesProgress';

function Simulation() {
  const navigate = useNavigate();
  const location = useLocation();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [text, setText] = useState('Click the button to begin simulation');
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [useOptimisation, setUseOptimisation] = useState(false);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (location.state !== null) {
      setUseOptimisation(location.state.useOptimisation);
    }
  }, []);

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  function forceUpdateHandler() {
    forceUpdate();
  }

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  async function beginSimulationHandler() {
    setSimulationStarted(true);
    await computerMoveHandler(board);
    forceUpdateHandler();
  }

  async function computerMoveHandler(board) {
    if (terminal(board)) return;

    // Computer move
    setText('Exploring all possible states...');
    await timeout(1000);
    let [optimalMove, statesExplored] = optimal_move(board, useOptimisation);
    let boardComputerMove = result(board, optimalMove);
    setBoard(boardComputerMove);
    setText(`Explored ${statesExplored} states.`);

    // Push states explored into steps
    let stepsArray = steps;
    stepsArray.push(statesExplored);
    setSteps(stepsArray);
    await timeout(750);

    return computerMoveHandler(boardComputerMove);
  }

  function backButtonHandler() {
    navigate('/');
  }

  function returnSteps() {
    return [
      {
        name: 'Move 1',
        description: `${steps[0] ? `Explored ${steps[0]} states` : 'Waiting...'}`,
        href: '#',
        status: `${steps[0] ? 'complete' : 'current'}`
      },
      {
        name: 'Move 2',
        description: `${steps[1] ? `Explored ${steps[1]} states` : 'Waiting...'}`,
        href: '#',
        status: `${steps[0] ? steps[1] ? 'complete' : 'current' : 'upcoming'}`
      },
      {
        name: 'Move 3',
        description: `${steps[2] ? `Explored ${steps[2]} states` : 'Waiting...'}`,
        href: '#',
        status: `${steps[1] ? steps[2] ? 'complete' : 'current' : 'upcoming'}`
      },
      {
        name: 'Move 4',
        description: `${steps[3] ? `Explored ${steps[3]} states` : 'Waiting...'}`,
        href: '#',
        status: `${steps[2] ? steps[3] ? 'complete' : 'current' : 'upcoming'}`
      },
      {
        name: 'Move 5',
        description: `${steps[4] ? `Explored ${steps[4]} states` : 'Waiting...'}`,
        href: '#',
        status: `${steps[3] ? steps[4] ? 'complete' : 'current' : 'upcoming'}`
      },
      {
        name: 'Move 6',
        description: `${steps[5] ? `Explored ${steps[5]} states` : 'Waiting...'}`,
        href: '#',
        status: `${steps[4] ? steps[5] ? 'complete' : 'current' : 'upcoming'}`
      },
      {
        name: 'Move 7',
        description: `${steps[6] ? `Explored ${steps[6]} states` : 'Waiting...'}`,
        href: '#',
        status: `${steps[5] ? steps[6] ? 'complete' : 'current' : 'upcoming'}`
      },
      {
        name: 'Move 8',
        description: `${steps[7] ? `Explored ${steps[7]} states` : 'Waiting...'}`,
        href: '#',
        status: `${steps[6] ? steps[7] ? 'complete' : 'current' : 'upcoming'}`
      },
      {
        name: 'Move 9',
        description: `${steps[8] ? `Explored ${steps[8]} states` : 'Waiting...'}`,
        href: '#',
        status: `${steps[7] ? steps[8] ? 'complete' : 'current' : 'upcoming'}`
      },
    ];
  }

  return (
    <div>
      <BackButton onClick={backButtonHandler}/>
      <div className='flex md:flex-row flex-col justify-center md:space-x-8 lg:space-x-24 md:space-y-0 space-y-8'>
        <div className="w-full md:w-3/5 lg:w-1/2 flex justify-center md:justify-end">
          <div className='w-11/12 sm:w-80'>
            <Message text={text}/>
            <Board board={board}/>
            {!simulationStarted &&
            <div className='mt-4 flex justify-center'>
              <button onClick={() => beginSimulationHandler()}
                      className='px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                Begin simulation
              </button>
            </div>}
          </div>
        </div>

        <div className="w-11/12 mx-auto md:w-2/5 lg:w-1/2 flex justify-start">
          <MovesProgress steps={returnSteps()}/>
        </div>
      </div>


    </div>
  );
}

export default Simulation;