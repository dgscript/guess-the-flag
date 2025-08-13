export default function Achivements({ setAchivementsTab, achivements }) {
  return (
    <div className="absolute outline-2 p-5 shadow-[0px_10px_black] bg-white top-0 left-0 md:m-5 max-md:w-full min-w-[16rem]">
      <div className="flex items-center justify-between pb-5">
        <p className="text-2xl font-bold">Achivements</p>

        <button
          onClick={() => {
            setAchivementsTab(false);
          }}
          className="border-black border-2 px-3 py-1 bg-red-400 hover:bg-red-500 hover:cursor-pointer font-bold transition"
        >
          {" "}
          X{" "}
        </button>
      </div>

      <div className="*:text-center text-2xl *:py-3 *:px-5 flex flex-col gap-2">
        {achivements.firstAchivement ? (
          <div className="border-2 bg-radial-[at_30%_25%] from-orange-300 via-orange-100 to-orange-600">
            25 Score!
          </div>
        ) : (
          <div className="border-2 bg-black text-white">???</div>
        )}
        {achivements.secondAchivement ? (
          <div className="border-2 bg-radial-[at_30%_25%] from-gray-300 via-gray-100 to-gray-600">
            100 Score!
          </div>
        ) : (
          <div className="border-2 bg-black text-white">???</div>
        )}
        {achivements.thirdAchivement ? (
          <div className="border-2 bg-radial-[at_30%_25%] from-yellow-300 via-yellow-100 to-yellow-600">
            194 Score!
          </div>
        ) : (
          <div className="border-2 bg-black text-white">???</div>
        )}
      </div>
    </div>
  );
}
