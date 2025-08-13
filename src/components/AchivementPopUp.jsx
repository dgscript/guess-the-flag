import { useEffect, useState } from "react";

export default function AchivementPopUp({ achivementIndex, achivements }) {
  const [closePopUp, setClosePopUp] = useState(true);

  const achivementSound = new Audio("./sounds/achivement.mp3");
  achivementSound.volume = 0.5;

  const [firstRender, setFirstRender] = useState(false);
  useEffect(() => {
    if (firstRender) {
      achivementSound.play();
      setClosePopUp(false);
      setTimeout(() => {
        setClosePopUp(true);
      }, 5000);

      localStorage.setItem("achivements", JSON.stringify(achivements));
    }
    setFirstRender(true);
  }, [achivementIndex]);

  return (
    <div
      className={`max-[424px]:w-full border-2 border-black bg-white p-5 fixed right-0  ${
        closePopUp ? "-bottom-1/2" : "bottom-0"
      } transition-[bottom_4s_ease] `}
    >
      <div className="flex items-center justify-between pb-5">
        <p className="text-2xl font-bold mr-7">New Achivement!</p>

        <button
          onClick={() => {
            setClosePopUp(true);
          }}
          className="border-black border-2 px-3 py-1 bg-red-400 hover:bg-red-500 hover:cursor-pointer font-bold transition"
        >
          {" "}
          X{" "}
        </button>
      </div>
      <div className="*:text-center text-2xl *:py-3 *:px-5 flex flex-col gap-2">
        {achivementIndex === 0 && (
          <div className="border-2 bg-radial-[at_30%_25%] from-orange-300 via-orange-100 to-orange-600">
            25 Score!
          </div>
        )}
        {achivementIndex === 1 && (
          <div className="border-2 bg-radial-[at_30%_25%] from-gray-300 via-gray-100 to-gray-600">
            100 Score!
          </div>
        )}
        {achivementIndex === 2 && (
          <div className="border-2 bg-radial-[at_30%_25%] from-yellow-300 via-yellow-100 to-yellow-600">
            194 Score!
          </div>
        )}
      </div>
    </div>
  );
}
