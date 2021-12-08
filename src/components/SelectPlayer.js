function SelectPlayer({onClick}) {
  return (
    <>
      <button
        className="w-72 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => onClick("X")}>Play as X
      </button>

      <button
        className="w-72 px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => onClick("O")}>Play as O
      </button>
    </>
  );
}

export default SelectPlayer;