import { useState } from "react";

export default function StartScreen({
  triggerStart,
  difficulty,
  setDifficulty,
  setAchivementsTab,
  gameLength,
  setGameLength,
}) {
  const [isOptionsActive, setIsOptionsActive] = useState(false);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  return (
    <div
      className={`transition w-full h-dvh flex items-center justify-center ${
        isLogoLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="outline-2 px-10 py-8 shadow-[10px_10px_black] bg-white 
      max-md:h-full max-md:w-full max-md:flex max-md:items-center max-md:justify-center"
      >
        {!isOptionsActive && (
          <div className="flex flex-col items-center">
            <img
              src="./logo.png"
              alt="guess the flag"
              className="max-w-[14rem]"
              onLoad={() => {
                setIsLogoLoaded(true);
              }}
            />
            <p className="text-3xl text-center max-[30rem]:text-2xl max-[25rem]:text-[1.2rem]">
              Welcome to <span className="font-bold">GUESS THE FLAG</span>!
            </p>
            <p className="text-2xl pb-5 max-sm:text-[1.3rem] max-[25rem]:text-[1.2rem] text-center">
              Press <span className="font-bold">START</span> and start guessing!
            </p>
            <div className="flex gap-5">
              <button
                onClick={triggerStart}
                className="bg-green-300 text-black border-2 border-black py-2 px-5 font-semibold text-3xl hover:cursor-pointer hover:bg-green-400 transition max-[25rem]:text-2xl"
              >
                START
              </button>
              <button
                onClick={() => {
                  setIsOptionsActive(true);
                }}
                className="bg-blue-400 text-black border-2 border-black py-2 px-5 font-semibold text-3xl hover:cursor-pointer hover:bg-blue-500 transition max-[25rem]:text-2xl"
              >
                OPTIONS
              </button>
            </div>
          </div>
        )}

        {isOptionsActive && (
          <div className="relative">
            <button
              onClick={() => {
                setIsOptionsActive(false);
              }}
              className="bg-blue-300 text-black border-2 border-black px-3 font-semibold text-2xl hover:cursor-pointer hover:bg-blue-400 transition absolute left-0"
            >
              {" "}
              &lt;{" "}
            </button>
            <button
              onClick={() => {
                setAchivementsTab(true);
              }}
              className="bg-yellow-300 text-black border-2 border-black px-2 py-2 font-semibold text-2xl hover:cursor-pointer hover:bg-yellow-400 transition absolute right-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M280-120v-80h160v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80v-80h400v80h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h160v80H280Zm0-408v-152h-80v40q0 38 22 68.5t58 43.5Zm200 128q50 0 85-35t35-85v-240H360v240q0 50 35 85t85 35Zm200-128q36-13 58-43.5t22-68.5v-40h-80v152Zm-200-52Z" />
              </svg>
            </button>
            <p className="text-4xl text-center pb-6">OPTIONS</p>

            <p className="text-2xl pb-3">Game Length</p>
            <div className="flex justify-between mb-5 items-center">
              <button
                onClick={() => {
                  setGameLength((prev) => {
                    switch (prev) {
                      case 195:
                        return 100;
                        break;
                      case 100:
                        return 50;
                        break;
                      case 50:
                        return 10;
                        break;
                      case 10:
                        return 10;
                        break;
                    }
                  });
                }}
                className="border-black border-2 px-3 text-[1.5rem] bg-red-300 hover:bg-red-400 hover:cursor-pointer transition"
              >
                -
              </button>
              <p className="text-3xl">{gameLength}</p>
              <button
                onClick={() => {
                  setGameLength((prev) => {
                    switch (prev) {
                      case 195:
                        return 195;
                        break;
                      case 100:
                        return 195;
                        break;
                      case 50:
                        return 100;
                        break;
                      case 10:
                        return 50;
                        break;
                    }
                  });
                }}
                className="border-black border-2 px-3 text-[1.5rem] bg-green-300 hover:bg-green-400 hover:cursor-pointer transition"
              >
                +
              </button>
            </div>

            <p className="text-2xl pb-3">Difficulty</p>
            <div className="flex gap-5 pb-7">
              <button
                onClick={() => {
                  setDifficulty("normal");
                }}
                className={`bg-yellow-300 text-black border-2 border-black py-2 px-5 font-semibold text-3xl hover:cursor-pointer hover:bg-yellow-400 transition ${
                  difficulty === "normal" && "outline-3 outline-blue-400"
                }`}
              >
                NORMAL
              </button>
              <button
                onClick={() => {
                  setDifficulty("hard");
                }}
                className={`bg-red-400 text-black border-2 border-black py-2 px-5 font-semibold text-3xl hover:cursor-pointer hover:bg-red-500 transition ${
                  difficulty === "hard" && "outline-3 outline-blue-400"
                }`}
              >
                HARD
              </button>
            </div>

            <p className="text-[1rem] pb-3">Made by dgscript</p>
            <a href="https://github.com/dgscript" target="_blank">
              <button className="border-black border-2 bg-gray-600 hover:bg-gray-500 hover:cursor-pointer transition">
                <img className="w-10 h-10" src="./github.png" alt="github" />
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
