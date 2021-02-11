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
  const [inputValues, setInputValues] = useState({
    hex1: "8a",
    hex2: "b78",
    // hex1: '043a718774c572bd8a25adbeb1b',
    // hex2: 'a31fe9656fc8d3a459e623dc820'
  });
  const [submitValues, setSubmitValues] = useState({});

  function handleChange(e) {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //TODO: validate inputValues exists, and are valid hex codes
    //TODO: if invalid, do not set submitValues, and display error to user
    //TODO: standardize inputValues to all lowercase

    setSubmitValues(inputValues);
  }

  return (
    <div className="App">
      <div className="my-24">
        <form action="" className="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="hex1"
            className=""
            value={inputValues.hex1}
            onChange={handleChange}
          />
          <input
            type="text"
            name="hex2"
            className=""
            value={inputValues.hex2}
            onChange={handleChange}
          />
          <button className="">Submit</button>
        </form>
      </div>
      <div className="flex row-reverse justify-center">
        <SumHex hex1={submitValues.hex1} hex2={submitValues.hex2} />
      </div>
    </div>
  );
}

export default App;
