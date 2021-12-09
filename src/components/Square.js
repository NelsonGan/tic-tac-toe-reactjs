function Square({ value, onClick }) {
  return (
    <div onClick={onClick}
         className={`h-24 border-solid border-2 border-black text-center flex items-center justify-center align-middle ${onClick && "cursor-pointer"}`}>
      <span className="text-5xl font-bold">{value}</span>
    </div>
  );
}

export default Square;