import { useState } from "react";
import { toHex, calculateRemaining } from "./utils";

import "./App.css";
/*
  - each component receives up to 2 hex values
  - takes the last character of each hex
  - converts it to decimal
  - adds it
  - converts that back to hex -> displays it
  - passes down 2 hexes, and the carryOver

  base case:
  - if the component receives no hex values, render nothing
  - if the component receives 1 hex, convert to decimal, sum with carryOver, display hex
*/

function DisplayHex({ remainder }) {
  if (typeof remainder === "undefined") {
    return null;
  }
  const displayedHexValue = toHex(remainder);
  return <span>{displayedHexValue}</span>;
}

function SumHex({ hex1, hex2, carryOver }) {
  if (!hex1 && !hex2) {
    return null;
  }
  const lastCharacter1 = hex1.slice(hex1.length - 1);
  const lastCharacter2 = hex2.slice(hex2.length - 1);
  const [newCarryOver, remainder] = calculateRemaining(
    lastCharacter1,
    lastCharacter2,
    carryOver
  );
  const remainingCharacters1 = hex1.slice(0, -1);
  const remainingCharacters2 = hex2.slice(0, -1);

  return (
    <>
      <DisplayHex remainder={remainder} />
      <SumHex
        hex1={remainingCharacters1}
        hex2={remainingCharacters2}
        carryOver={newCarryOver}
      />
    </>
  );
}

function App() {
  const [inputValue1, setInputValue1] = useState("8a");
  const [inputValue2, setInputValue2] = useState("b78");

  return (
    <div className="App">
      <div className="my-24">
        <input
          type="text"
          className=""
          value={inputValue1}
          onChange={(e) => setInputValue1(e.target.value)}
        />
        <input
          type="text"
          className=""
          value={inputValue2}
          onChange={(e) => setInputValue2(e.target.value)}
        />
      </div>
      <div className="flex row-reverse justify-center">
        <SumHex hex1={inputValue1} hex2={inputValue2} />
      </div>
    </div>
  );
}

export default App;
