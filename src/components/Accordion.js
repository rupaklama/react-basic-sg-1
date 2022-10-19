import React, { Fragment, useRef, useState } from "react";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // console.count("render");

  // To manipulate DOM
  // similar to document query selector
  const ref = useRef();
  // console.log(ref.current);

  const handleClick = index => {
    setActiveIndex(index);
  };

  const renderItems = items.map((item, i) => {
    // Manipulating Class
    const active = i === activeIndex ? "active" : "";

    return (
      <Fragment key={"item" + i}>
        <div className={`title ${active}`} onClick={() => handleClick(i)}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>

        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </Fragment>
    );
  });

  return (
    <div ref={ref} className="ui styled accordion">
      {renderItems}
    </div>
  );
};

export default Accordion;
