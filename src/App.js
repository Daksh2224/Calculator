import React, { useState, useEffect } from "react";
import "./App.css";
import { evaluate } from "mathjs";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [dark, setDark] = useState(false);

  // Handle button click
  const handleClick = (value) => {
    setInput((prev) => prev + value); 
  };

  // Calculate result
  const calculate = () => {
    try {
      const result = evaluate(input);
      setHistory([...history, `${input} = ${result}`]);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  // Clear
  const clear = () => {
    setInput("0");
  };

  // Keyboard Support
  useEffect(() => {
    const handleKey = (e) => {
      if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
        setInput((prev) => prev + e.key);
      } else if (e.key === "Enter") {
        calculate();
      } else if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [input]);

  return (
    <div className={dark ? "app dark" : "app"}>
      <div className="calculator">
        <div className="top-bar">
          <h2>Advanced Calculator</h2>
          <button onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        <input type="text" value={input} readOnly />

        <div className="buttons">
          <button onClick={clear}>C</button>
          <button onClick={() => handleClick("/")}>/</button>
          <button onClick={() => handleClick("*")}>*</button>
          <button onClick={() => handleClick("-")}>-</button>

          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("+")}>+</button>

          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>

          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>

          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button className="equal" onClick={calculate}>
            =
          </button>
        </div>

        {/* History */}
        <div className="history">
          <h3>History</h3>
          {history.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;