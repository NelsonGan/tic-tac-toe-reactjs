import Square from './Square';

function Board({board, onClick}) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 mx-auto w-64 border-black border-solid border-2">
      {board.map((square, i) => {
        if (square === null && onClick) {
          return <Square value={square} onClick={() => onClick(i)} key={i}/>
        } else {
          return <Square value={square} key={i}/>
        }
      })}
    </div>
  );
}

export default Board;