import classes from "./GridBackground.module.css";

/** number of minor lines */
const count = 20;
/** every this many minor lines becomes major line */
const multiple = 4;
/** spacing between lines in svg units */
const spacing = 50;
/** square boundary distance */
const bound = count * spacing;

/** grid visualization */
const Background = () => (
  <div className={classes.background}>
    <svg
      className={classes.svg}
      viewBox={`-${bound} -${bound} ${bound * 2} ${bound * 2}`}
    >
      {/* minor */}
      <Lines color="#808080" thickness={2} />
      {/* major */}
      <Lines color="#03a9f4" thickness={4} multiple={multiple} delay={1} />
    </svg>
  </div>
);

type LinesProps = {
  color: string;
  thickness: number;
  multiple?: number;
  delay?: number;
};

/** grid lines */
const Lines = ({ color, thickness, multiple = 1, delay = 0 }: LinesProps) => {
  const horizontal = [];
  const vertical = [];

  for (let line = -count; line <= count; line++) {
    if (line % multiple !== 0) continue;
    const animationDelay = delay + line / 20 + "s";
    horizontal.push(
      <line
        key={line}
        className={classes.line}
        style={{ animationDelay }}
        x1={line * spacing}
        x2={line * spacing}
        y1={-bound}
        y2={bound}
        pathLength={1}
      />,
    );
    vertical.push(
      <line
        key={line}
        className={classes.line}
        style={{ animationDelay }}
        x1={-bound}
        x2={bound}
        y1={line * spacing}
        y2={line * spacing}
        pathLength={1}
      />,
    );
  }

  return (
    <g fill="none" stroke={color} strokeWidth={thickness}>
      <g>{horizontal}</g>
      <g>{vertical}</g>
    </g>
  );
};

export default Background;
