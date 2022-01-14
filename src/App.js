import React, { useState, useEffect, useCallback } from "react";
import './App.css';

const COLORS= {
  black: "black",
  blue: "blue",
  green: "green"
}

const GRID_ROWS = 10;
const GRID_COLUMNS = 10;

const isMouseDown = () => window.mouseDownState;

window.addEventListener("mousedown", () => {
  window.mouseDownState = true;
  console.log("mousedown");
});
window.addEventListener("mouseup", () => {
  window.mouseDownState = false;
  console.log("mouseUp");
});

function App() {

  const [activeColor, setActiveColor] = useState(COLORS.black);

  const [showGrid, setShowGrid] = useState(true);
  const toggleGrid = () => setShowGrid(!showGrid);

  // cellsKey is used to force cells to re-render to empty state
  const [cellsKey, setCellsKey] = useState(true);

  return (
    <div className="App">
      <h1>Grid x Grid Paint</h1>
      <main>
      <section
        key={cellsKey}
        className={["cells", showGrid ? "show-grid" : "hide-grid"].join(" ")}
      >
        {Array.from({ length: GRID_ROWS }).map((_, i) => (
          <div className="row" key={i}>
            {Array.from({ length: GRID_COLUMNS }).map((_, j) => (
              <Cell key={j} id={`${j},${i}`} activeColor={activeColor} />
            ))}
          </div>
        ))}
      </section>

      <section className="controls">
        <fieldset>
          <legend>
            Color: <CellButton color={activeColor} />
          </legend>
          {Object.entries(COLORS).map(([key, value]) => (
            <CellButton
              key={key}
              title={`Select color: ${key}`}
              color={value}
              onClick={() => setActiveColor(value)}
            />
          ))}
        </fieldset>
      </section>

    </main>
    </div>
  );
}

const Cell = ({
  id,
  activeColor,
  onChange = (id, c) => console.log(id, c)
}) => {
  const [color, setColor] = useState(COLORS.black);

  const handleMouseDown = useCallback(() => {
    setColor(activeColor);
    onChange(id, activeColor);
  }, [activeColor, id, onChange]);

  const handleMouseOver = useCallback(() => {
    if (isMouseDown()) {
      setColor(activeColor);
      onChange(id, activeColor);
    }
  }, [activeColor, id, onChange]);

  const handleDoubleClick = useCallback(() => setColor(COLORS.white), []);

  return (
    <CellButton
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      color={color}
      title={`A ${color} cell`}
    />
  );
};

const CellButton = ({ color, ...otherProps }) => {
  return (
    <span style={{ backgroundColor: color }} className="cell" {...otherProps} />
  );
};

export default App;
