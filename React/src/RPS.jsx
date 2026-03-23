import { useState } from "react";
import "./RPS.css";

export default function RPS() {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("Válassz egyet!");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const choices = ["stone", "paper", "scissors"];

  function play(choice) {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];

    setPlayerChoice(choice);
    setComputerChoice(randomChoice);

    if (choice === randomChoice) {
      setResult("DRAW");
    } else if (
      (choice === "stone" && randomChoice === "scissors") ||
      (choice === "paper" && randomChoice === "stone") ||
      (choice === "scissors" && randomChoice === "paper")
    ) {
      setResult("WIN");
      setPlayerScore(playerScore + 1);
    } else {
      setResult("LOSE");
      setComputerScore(computerScore + 1);
    }
  }

  return (
    <div className="rps-container">
      <div className="rps-title">Kő - Papír - Olló</div>

      <div className="score-row">
        <div className="score-box">
          <div>Te</div>
          <div className="score-number">{playerScore}</div>
        </div>

        <div className="result-box">
          {result}
        </div>

        <div className="score-box">
          <div>GÉP</div>
          <div className="score-number">{computerScore}</div>
        </div>
      </div>

      <div className="choice-info">
        <p>Játékos választása: {playerChoice}</p>
        <p>Gép választása: {computerChoice}</p>
      </div>

      <div className="buttons-row">
        <button className="choice-button" onClick={() => play("stone")}>
          🪨
          <span>Kő</span>
        </button>

        <button className="choice-button" onClick={() => play("paper")}>
          🧻
          <span>Papír</span>
        </button>

        <button className="choice-button" onClick={() => play("scissors")}>
          ✂️
          <span>Olló</span>
        </button>
      </div>
    </div>
  );
}