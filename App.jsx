import React from "react";
import clsx from "clsx";
import { languages } from "./languages";
import { getFarewellText, getRandomWord } from "./utils";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = React.useState(() => getRandomWord());

  const wordArrayed = currentWord.split("");

  const keyboard = "qwertyuiopasdfghjklzxcvbnm";

  const keyboardArrayed = keyboard.split("");

  const [guessLetter, setGuessLetter] = React.useState([]);

  let filterGuessCount = guessLetter.filter((guessLetter) =>
    currentWord.includes(guessLetter)
  ).length;

  let wrongGuessCount = guessLetter.length - filterGuessCount;

  let isGameLost = wrongGuessCount === languages.length - 1 ? true : false;

  let isGameWon = wordArrayed.every((letterArrayed) =>
    guessLetter.includes(letterArrayed)
  );

  let isGameOver = isGameLost || isGameWon;

  function addLetter(props) {
    setGuessLetter((prevLetters) =>
      prevLetters.includes(props.letter)
        ? prevLetters
        : [...prevLetters, props.letter]
    );
  }

  const lastGuessedLetter = guessLetter[guessLetter.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const gameStatusClass = clsx("result", {
    won: isGameWon,
    lost: isGameLost,
    farewell: isLastGuessIncorrect && !isGameLost,
  });

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessLetter([]);
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className={gameStatusClass}>
        {isGameLost && (
          <>
            <h2>Game over!</h2>
            <p>You lose! Better start learning Assembly 💀</p>
          </>
        )}
        {isGameWon && (
          <>
            <h2>You Win!</h2>
            <p>Well done! 🎉</p>
          </>
        )}
        {!isGameWon && !isGameLost && isLastGuessIncorrect && (
          <>
            <p>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
          </>
        )}
      </section>
      <section className="languages">
        {languages.map((language, index) => {
          const isDead = wrongGuessCount > index;
          return (
            <div
              className={isDead ? "deadLanguage" : "singleLanguage"}
              style={{
                color: language.color,
                backgroundColor: language.backgroundColor,
                position: "relative",
                overflow: "hidden",
              }}
              key={language.name}
            >
              {isDead && <span className="skull-emoji">💀</span>}
              <span className={isDead ? "language-name dead" : "language-name"}>
                {language.name}
              </span>
            </div>
          );
        })}
      </section>
      <section className="guessWord">
        {wordArrayed.map((letter, index) => (
          <span key={index}>
            {isGameLost || guessLetter.includes(letter)
              ? letter.toUpperCase()
              : ""}
          </span>
        ))}
      </section>
      <section className="keyboard">
        {keyboardArrayed.map((letter) => {
          const isGuessed = guessLetter.includes(letter);
          const isCorrect = isGuessed && currentWord.includes(letter);
          const isWrong = isGuessed && !currentWord.includes(letter);
          const className = clsx({
            correct: isCorrect,
            wrong: isWrong,
          });
          return (
            <button
              onClick={() => addLetter({ letter })}
              key={letter}
              disabled={isGameOver}
              className={className}
            >
              {letter.toUpperCase()}
            </button>
          );
        })}
      </section>
      {isGameOver === true && (
        <button onClick={startNewGame} className="newGame">
          New Game
        </button>
      )}
    </main>
  );
}
