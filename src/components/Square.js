function Square({ value, onClick }) {
  return (
    <div onClick={onClick}
         className={`h-24 border-solid border-2 border-black text-center flex justify-center align-middle ${onClick && "cursor-pointer"}`}>
      <span>{value}</span>
    </div>
  );
}

export default Square;