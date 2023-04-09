import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ options, selected, setSelected }) => {
  const [toggle, setToggle] = useState(false);

  // note - useRef will always set to NULL on component unmount
  
  // note - useRef is to access or get a reference to a DOM elements that current component creates.
  // eg. If we have multiple DropDown components,
  // useRef will reference to its individual dom elements within every individual DropDown components.
  const inputRef = useRef();
  console.log("REF", inputRef.current);

  useEffect(() => {
    const onBodyClick = e => {
      // to see what element was clicked
      console.log("clicked element", e.target);

      console.log("Body click");

      // finding out if the element got clicked is inside this component
      // if it is we don't want Body Listener to do anything

     // note - Important thing to do always when using useRef is
      // that useRef will always set to NULL on component unmount or when component is not visible.
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
   
    // note - At some point, DropDown component will unmount/removed from the ui like when navigating to different page
    // So that point of time, we need to tell addEventListener function stop watching for clicks
    // The above click addEventListener gets call always even if the DropDown is not visible in the screen
    // So to avoid this issue, we need to the Event listener to stop watching for clicks
    // whenever the component is removed from the screen by using Clean UP method.
    // BECAUSE WE WANT TO START CLEAN ALWAYS ON RE-RENDER - meaning don't run any Current On Going Event Listeners
    // NOTE - Clean UP method gets CALL automatically whenever the component is about to removed from the screen

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
