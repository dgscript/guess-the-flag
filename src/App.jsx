import { useEffect, useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import FinalScreen from "./components/FinalScreen";
import Achivements from "./components/Achivements";
import AchivementPopUp from "./components/AchivementPopUp";

function App() {
  const [countries, setCountries] = useState(null);
  const [countryNames, setCountryNames] = useState(null);
  const [flagIndex, setFlagIndex] = useState(null);
  const [currentFlag, setCurrentFlag] = useState(null);
  const [indexCount, setIndexCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [gameLength, setGameLength] = useState(0);
  const [score, setScore] = useState(0);
  const [randomIndexes, setRandomIndexes] = useState([]);
  const [options, setOptions] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [achivementsTab, setAchivementsTab] = useState(false);
  const [returnTab, setReturnTab] = useState(false);
  const [achivements, setAchivements] = useState({
    firstAchivement: false,
    secondAchivement: false,
    thirdAchivement: false,
  });
  const [achivementIndex, setAchivementIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isFlagFullyLoaded, setIsFlagFullyLoaded] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("normal");

  const correctSound = new Audio("./sounds/correct.mp3");
  const incorrectSound = new Audio("./sounds/incorrect.mp3");

  correctSound.volume = 0.2;
  incorrectSound.volume = 0.2;

  /* the data is fetched from the json file when the page is first loaded*/
  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch("data.json");
      const data = await response.json();
      setCountries(data);
      setGameLength(data.length);
    }
    fetchCountries();
  }, []);

  /* set the next index for the next flag to guess */
  function nextIndex() {
    if (indexCount === gameLength - 1) {
      setIsGameEnded(true);
    } else {
      setIndexCount(indexCount + 1);
      setFirstIndexChange(true);
    }
  }
  useEffect(() => {
    setFlagIndex(randomIndexes[indexCount]);
  }, [indexCount]);

  /* checks if the first render is done then set the next flag index */
  const [firstIndexChange, setFirstIndexChange] = useState(false);
  useEffect(() => {
    if (firstIndexChange) {
      setCurrentFlag(countries[flagIndex].flags.png);
      populateOptions();
    }
  }, [flagIndex]);

  function startGame() {
    /* generates an array with random numbers to prevent repetitions*/
    let indexCache = [];
    for (let i = 0; i < countries.length; i++) {
      indexCache.push(i);
    }
    /* it sorts the array of numbers randomly */
    indexCache.sort(() => Math.random() - 0.5);
    setRandomIndexes(indexCache);

    setFlagIndex(indexCache[indexCount]);
    setCurrentFlag(countries[indexCache[indexCount]].flags.png);

    if (countries.length > 0) {
      populateCountryNames();
    }

    setIsGameStarted(true);
  }

  useEffect(() => {
    if (isGameStarted) {
      let currentAnswer = countries[flagIndex].name.common;
      setCorrectAnswer(currentAnswer);
      populateOptions();
    }
  }, [isGameStarted]);

  function populateCountryNames() {
    let countryNamesCache = [];
    for (let i = 0; i < countries.length; i++) {
      countryNamesCache.push(countries[i].name.common);
    }
    countryNamesCache.sort(() => Math.random() - 0.5);
    setCountryNames(countryNamesCache);
  }

  function populateOptions() {
    let options = [];

    if (difficulty === "easy") {
      options = [
        countryNames[Math.floor(Math.random() * countries.length)],
        countries[flagIndex].name.common,
      ];
    }
    if (difficulty === "normal") {
      options = [
        countryNames[Math.floor(Math.random() * countries.length)],
        countryNames[Math.floor(Math.random() * countries.length)],
        countries[flagIndex].name.common,
      ];
    }
    if (difficulty === "hard") {
      options = [
        countryNames[Math.floor(Math.random() * countries.length)],
        countryNames[Math.floor(Math.random() * countries.length)],
        countryNames[Math.floor(Math.random() * countries.length)],
        countryNames[Math.floor(Math.random() * countries.length)],
        countries[flagIndex].name.common,
      ];
    }

    const shuffledOptions = options.sort(() => Math.random() - 0.5);

    setOptions(shuffledOptions);
  }

  function handleAnswers(answer) {
    let currentAnswer = countries[flagIndex].name.common;
    setAnswered(true);

    if (answer === currentAnswer) {
      correctSound.play();
      setCorrectCount(correctCount + 1);
      setScore(score + 1);
      document.body.style.background = "#b6ff6e";
      setTimeout(() => {
        setAnswered(false);
        document.body.style.background = 'url("../background.png") 50% / cover';
        setIsFlagFullyLoaded(false);
        nextIndex();
      }, 1000 /* 1000 */);
    } else {
      incorrectSound.play();
      setIncorrectCount(incorrectCount + 1);
      if (score > 0) {
        document.body.style.background = "#ff816e";
        setScore(score - 1);
        setTimeout(() => {
          setAnswered(false);
          document.body.style.background =
            'url("../background.png") 50% / cover';
          setIsFlagFullyLoaded(false);
          nextIndex();
        }, 1000);
      } else {
        document.body.style.background = "#ff816e";
        setTimeout(() => {
          setAnswered(false);
          document.body.style.background =
            'url("../background.png") 50% / cover';
          setIsFlagFullyLoaded(false);
          nextIndex();
        }, 1000 /* 1000 */);
      }
    }
  }

  /* detects when the user earns an achivement */
  useEffect(() => {
    if (score > 24) {
      setAchivements((prev) => ({ ...prev, firstAchivement: true }));
      if (!achivements.firstAchivement) {
        setAchivementIndex(0);
      }
      localStorage.setItem("achivements", JSON.stringify(achivements));
    }
    if (score > 99) {
      setAchivements((prev) => ({ ...prev, secondAchivement: true }));
      if (!achivements.secondAchivement) {
        setAchivementIndex(1);
      }
      localStorage.setItem("achivements", JSON.stringify(achivements));
    }
    if (score > 193) {
      setAchivements((prev) => ({ ...prev, thirdAchivement: true }));
      if (!achivements.thirdAchivement) {
        setAchivementIndex(2);
      }
      localStorage.setItem("achivements", JSON.stringify(achivements));
    }
  }, [score]);

  /* cached achivements are loaded */
  useEffect(() => {
    let cachedAchivements = JSON.parse(localStorage.getItem("achivements"));
    if (cachedAchivements) {
      setAchivements(cachedAchivements);
    }
  }, []);

  return (
    <>
      {!isGameStarted && !isGameEnded && (
        <StartScreen
          triggerStart={startGame}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          setAchivementsTab={setAchivementsTab}
          setGameLength={setGameLength}
          gameLength={gameLength}
        />
      )}

      {isGameStarted && !isGameEnded && (
        <div
          className={`bg-green max-md:flex-col w-full h-dvh flex justify-center items-center transition-opacity`}
        >
          {/* return button */}
          <button
            onClick={() => {
              setReturnTab(true);
            }}
            className="m-5 top-0 left-0 absolute bg-yellow-400 text-black border-2 border-black py-1 px-4 font-semibold text-[1.2rem] hover:cursor-pointer hover:bg-yellow-500 transition"
          >
            {" "}
            &lt;{" "}
          </button>

          {/* return to the start page popup */}
          <div
            className={` outline-2 p-5 shadow-[10px_10px_black] bg-white flex flex-col items-center max-w-[350px] absolute transition-[top_4s_ease] mt-5 -top-1/2 ${
              returnTab && "top-1/2 -translate-y-1/2 max-[424px]:mx-5"
            }`}
          >
            <p className="text-2xl text-center pb-7 font-semibold max-[424px]:text-[1rem]">
              Are you sure you want to return? Your progress{" "}
              <span className="font-bold text-red-500">won't be saved</span>!
            </p>
            <div className="flex gap-5">
              <button
                onClick={() => {
                  setReturnTab(false);
                  setIsGameStarted(false);
                  setIndexCount(0);
                  setCorrectCount(0);
                  setIncorrectCount(0);
                  setScore(0);
                  setIsFlagFullyLoaded(false);
                }}
                className="bg-green-300 max-[424px]:text-[1.2rem] text-black border-2 border-black px-3 py-2 font-semibold text-3xl hover:cursor-pointer hover:bg-green-400 transition"
              >
                Return
              </button>
              <button
                onClick={() => {
                  setReturnTab(false);
                }}
                className="bg-red-400 text-black border-2 max-[424px]:text-[1.2rem] border-black px-3 py-2 font-semibold text-3xl hover:cursor-pointer hover:bg-red-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* scoreboard */}
          <div className="outline-2 py-2 px-4 shadow-[10px_10px_black]  bg-white absolute top-0 right-0">
            <p className="md:text-2xl font-semibold text-center">
              Score: {score}
            </p>
            <p className="md:text-[1.3rem] font-semibold text-center">
              {indexCount} / {gameLength}
            </p>
          </div>

          {/* loading screen for the flag */}
          {!isFlagFullyLoaded && (
            <div className="w-full h-[100dvh]  fixed flex justify-center items-center">
              <img
                src="./loading.gif"
                alt="loading"
                className="max-w-[8rem] loading-delay"
              />
            </div>
          )}

          <div
            className={`bg-green max-md:flex-col w-full h-dvh flex justify-center items-center transition-opacity  ${
              isFlagFullyLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* div with the flag */}
            <div className="outline-2 p-5 shadow-[10px_10px_black]  bg-white md:mr-5 max-md:mb-5 mx-5">
              <p className="text-2xl pb-5 text-center font-bold">
                {answered ? correctAnswer : "Which flag is this?"}
              </p>
              <img
                src={currentFlag}
                alt="flag"
                className="h-52 max-[424px]:h-44"
                onLoad={() => {
                  setIsFlagFullyLoaded(true);
                  let currentAnswer = countries[flagIndex].name.common;
                  setCorrectAnswer(currentAnswer);
                }}
              />
            </div>

            {/* div containing the option buttons */}
            <div className="outline-2 p-5 shadow-[10px_10px_black] *:outline-2 *:p-2 *:bg-blue-400 font-semibold flex flex-col gap-4 min-w-2xs *:hover:bg-blue-500 *:hover:cursor-pointer bg-white text-[1.3rem] *:transition max-[374px]:*:text-[1rem]">
              <button
                onClick={(e) => {
                  handleAnswers(e.target.dataset.option);
                  e.target.disabled = true;
                  setTimeout(() => {
                    e.target.disabled = false;
                  }, 1000);
                }}
                data-option={options[0]}
              >
                {options[0]}
              </button>
              <button
                onClick={(e) => {
                  handleAnswers(e.target.dataset.option);
                  e.target.disabled = true;
                  setTimeout(() => {
                    e.target.disabled = false;
                  }, 1000);
                }}
                data-option={options[1]}
              >
                {options[1]}
              </button>
              {difficulty === "normal" && (
                <button
                  onClick={(e) => {
                    handleAnswers(e.target.dataset.option);
                    e.target.disabled = true;
                    setTimeout(() => {
                      e.target.disabled = false;
                    }, 1000);
                  }}
                  data-option={options[2]}
                >
                  {options[2]}
                </button>
              )}
              {difficulty === "hard" && (
                <button
                  onClick={(e) => {
                    handleAnswers(e.target.dataset.option);
                    e.target.disabled = true;
                    setTimeout(() => {
                      e.target.disabled = false;
                    }, 1000);
                  }}
                  data-option={options[3]}
                >
                  {options[3]}
                </button>
              )}
              {difficulty === "hard" && (
                <button
                  onClick={(e) => {
                    handleAnswers(e.target.dataset.option);
                    e.target.disabled = true;
                    setTimeout(() => {
                      e.target.disabled = false;
                    }, 1000);
                  }}
                  data-option={options[4]}
                >
                  {options[4]}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isGameEnded && (
        <FinalScreen
          score={score}
          incorrectCount={incorrectCount}
          correctCount={correctCount}
          setIsGameEnded={setIsGameEnded}
          setIsGameStarted={setIsGameStarted}
          setIndexCount={setIndexCount}
          setCorrectCount={setCorrectCount}
          setIncorrectCount={setIncorrectCount}
          setRandomIndexes={setRandomIndexes}
          setOptions={setOptions}
          setScore={setScore}
          setIsFlagFullyLoaded={setIsFlagFullyLoaded}
        />
      )}

      {achivementsTab && (
        <Achivements
          setAchivementsTab={setAchivementsTab}
          achivements={achivements}
        />
      )}

      <AchivementPopUp
        achivements={achivements}
        achivementIndex={achivementIndex}
      />
    </>
  );
}

export default App;
