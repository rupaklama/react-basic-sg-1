import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Dropdown from "./components/Dropdown";
import Search from "./components/Search";

const items = [
  { title: "What is React?", content: "React is a frond end Javascript Library" },
  { title: "What is Angular?", content: "Angular is a frond end Javascript Framework" },
  { title: "What is Vue?", content: "Vue is a frond end Javascript Library" },
];

const options = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
];

const App = () => {
  const [selected, setSelected] = useState(options[0]);

  // to debug memory leak
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div>
      <br />
      {showDropdown ? <Dropdown options={options} selected={selected} setSelected={setSelected} /> : null}
      <br />
      <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
      <br />
      <br />

      <Search />

      <br />
      <Accordion items={items} />
    </div>
  );
};

export default App;
