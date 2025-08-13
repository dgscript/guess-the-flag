export default function FinalScreen({
  score,
  incorrectCount,
  correctCount,
  setIsGameEnded,
  setIndexCount,
  setCorrectCount,
  setIncorrectCount,
  setIsGameStarted,
  setScore,
  setIsFlagFullyLoaded,
}) {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <div className="outline-2 px-10 py-8 flex flex-col items-center shadow-[10px_10px_black] bg-white max-[424px]:outline-0 max-[424px]:w-full max-[424px]:h-full max-[424px]:flex max-[424px]:justify-center">
        <p className="text-4xl font-bold pb-5 max-[424px]:text-[1.6rem]">
          Congratulations!
        </p>

        <p className="text-2xl">Final Score:</p>
        <p className="text-[5rem]">{score}</p>

        <p className="text-2xl text-green-600">
          Correct answers: {correctCount}
        </p>
        <p className="pb-5 text-2xl text-red-700">
          Incorrect answers: {incorrectCount}
        </p>

        <button
          onClick={() => {
            setIsGameEnded(false);
            setIsGameStarted(false);
            setIndexCount(0);
            setCorrectCount(0);
            setIncorrectCount(0);
            setScore(0);
            setIsFlagFullyLoaded(false);
          }}
          className="bg-green-300 text-black border-2 border-black py-2 px-5 font-semibold text-3xl hover:cursor-pointer hover:bg-green-400 transition"
        >
          Return
        </button>
      </div>
    </div>
  );
}
