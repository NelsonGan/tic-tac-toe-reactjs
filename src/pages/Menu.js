import SelectPlayer from '../components/SelectPlayer';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';

function Menu(props) {
  let navigate = useNavigate();
  const [useOptimisation, setUseOptimisation] = useState(false);

  function selectPlayerHandler(player) {
    navigate('/game', {
      state: {
        player: player,
        useOptimisation: useOptimisation,
      }
    })
  }

  function goToSimulationHandler() {
    navigate('/simulation', {
      state: {
        useOptimisation: useOptimisation
      }
    })
  }

  function toggleUseOptimisationHandler() {
    setUseOptimisation(!useOptimisation);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className='flex flex-col items-center space-y-2 text-center'>
        <h1 className="text-6xl font-bold">Tic-Tac-Toe</h1>
        <h2 className="text-4xl font-medium">Minimax Implementation</h2>
        <h3 className="text-xl font-medium pb-4">with Alpha-Beta Pruning</h3>
        <div className="w-full bg-black" style={{height:"2px"}}></div>
        
        <div className="flex flex-col space-y-3 pt-4">
          <div className='flex items-center'>
            <button onClick={toggleUseOptimisationHandler} type='button'
                    className={`${useOptimisation ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    role='switch' aria-checked='false' aria-labelledby='annual-billing-label'>
              <span aria-hidden='true'
                    className={`${useOptimisation ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}/>
            </button>
            <span className='ml-3' id='annual-billing-label'>
              <span className='text-sm font-medium text-gray-900'>Alpha Beta Pruning</span>
            </span>
          </div>

          
          <SelectPlayer onClick={selectPlayerHandler}/>
          <button
            onClick={goToSimulationHandler}
            type='button'
            className='w-72 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Simulation
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;