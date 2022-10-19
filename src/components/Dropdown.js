import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ options, selected, setSelected }) => {
  const [toggle, setToggle] = useState(false);

  // note - useRef will always set to NULL on component unmount
  const inputRef = useRef();
  console.log("REF", inputRef.current);

  useEffect(() => {
    const onBodyClick = e => {
      // to see what element was clicked
      console.log("clicked element", e.target);

      console.log("Body click");

      // finding out if the element got clicked is inside this component
      // if it is we don't want Body Listener to do anything

      // note - This will run whenever we click some outside elements on the DOM
      // inputRef.current === null - this will throw an error on reading its value again
      if (inputRef.current.contains(e.target)) {
        console.log("Component elements");

        return;
      }

      setToggle(false);
    };

    // To make Event Propagation in React by converting your listener to use the Capture Phase.
    // To do this, you can pass { capture: true } as the third argument to document.addEventListener
    // { capture: true }
    document.body.addEventListener("click", onBodyClick, { capture: true });

    // note - to prevent NULL Error we should REMOVE the event listener using Clean up method
    // Clean up method will get Call FIRST on render to remove the event listener
    // BECAUSE WE WANT TO START CLEAN ALWAYS ON RENDER - meaning don't run above Event Listener

    return () => {
      console.log("CLEAN UP GOT INVOKE");
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const displayOptions = options.map((item, i) => {
    if (item.value === selected.value) {
      return null;
    }

    return (
      <div
        key={"option" + i}
        className="item"
        onClick={() => {
          console.log("Item click");
          setSelected(item);
        }}
      >
        <option value={item.value}>{item.label}</option>
      </div>
    );
  });

  return (
    <div ref={inputRef} className="ui form">
      <div className="field">
        <label htmlFor="option-select" className="label">
          Select a Color:
        </label>

        <div
          className={`ui selection dropdown ${toggle ? "visible active" : ""}`}
          onClick={() => {
            console.log("Dropdown click");

            setToggle(!toggle);
          }}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${toggle ? "visible transition" : ""}`}>{displayOptions}</div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
