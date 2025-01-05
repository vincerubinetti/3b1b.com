import clsx from "clsx";
import { range } from "lodash-es";
import { cos, sin } from "@/util/math";
import classes from "./Logo.module.css";

/** colors */
const blue = ["#74c0e3", "#528ea3", "#3e6576", "#224c5b", "#000000"];
const brown = ["#8c6239", "#754c24", "#603813", "#42210b", "#000000"];

/** number of star points */
const points = 28;
/** angle step */
const angleStep = 360 / points;
/** triangle height */
const height = 50;
/** half triangle base */
const halfBase = height * Math.tan((2 * Math.PI) / points);

/** iris star radii */
const r0 = 50;
const r1 = 43.75;
const r2 = 37.5;
const r3 = 30;
const r4 = 25;

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => (
  <svg
    className={clsx(classes.logo, className)}
    viewBox={`-${r0} -${r0} ${r0 * 2} ${r0 * 2}`}
  >
    <IrisBack />
    <IrisOffset radius={r1} color={1} />
    <Iris radius={r0} color={2} />
    <Iris radius={r2} color={3} />
    <Iris radius={r3} color={4} />
    <Pupil />
  </svg>
);

export default Logo;

/** solid color backing of eye */
const IrisBack = () => (
  <g>
    <path
      fill={blue[0]}
      d={`M 0 0 L 0 -${r0} A ${r0} ${r0} 0 1 1 -${r0} 0 z`}
    />
    <path
      fill={brown[0]}
      d={`M 0 0 L 0 -${r0} A ${r0} ${r0} 0 0 0 -${r0} 0 z`}
    />
  </g>
);

type TriangleProps = {
  angle: number;
  radius: number;
  color?: string;
  half?: "right" | "left";
};

/** one triangle piece of an iris layer */
const Triangle = ({ angle, radius, color, half }: TriangleProps) => {
  angle *= angleStep;
  const tip = [cos(angle) * radius, -sin(angle) * radius];
  const midBase = [
    cos(angle) * (radius - height),
    -sin(angle) * (radius - height),
  ] as const;
  const leftBase = [
    midBase[0] + cos(angle + 90) * halfBase,
    midBase[1] - sin(angle + 90) * halfBase,
  ];
  const rightBase = [
    midBase[0] + cos(angle - 90) * halfBase,
    midBase[1] - sin(angle - 90) * halfBase,
  ];
  const points = [
    tip,
    half === "right" ? midBase : leftBase,
    half === "left" ? midBase : rightBase,
  ]
    .map(([x, y]) => x.toFixed(2) + "," + y.toFixed(2))
    .join(" ");

  return <polygon fill={color ?? ""} points={points} />;
};

type IrisOffsetProps = {
  radius: number;
  color: number;
};

/** iris layer, ring of triangles, with angle offset */
const IrisOffset = ({ radius, color }: IrisOffsetProps) => (
  <g className={classes.iris}>
    {range(-14, 7).map((angle, index) => (
      <Triangle
        key={index}
        angle={angle + 0.5}
        radius={radius}
        color={blue[color]}
      />
    ))}
    {range(7, 14).map((angle, index) => (
      <Triangle
        key={index}
        angle={angle + 0.5}
        radius={radius}
        color={brown[color]}
      />
    ))}
  </g>
);

type IrisProps = {
  radius: number;
  color: number;
};

/** iris layer, ring of triangles */
const Iris = ({ radius, color }: IrisProps) => (
  <g className={classes.iris}>
    <Triangle angle={-14} radius={radius} color={blue[color]} half="left" />
    {range(-13, 7).map((angle, index) => (
      <Triangle key={index} angle={angle} radius={radius} color={blue[color]} />
    ))}
    <Triangle angle={7} radius={radius} color={blue[color]} half="right" />
    <Triangle angle={7} radius={radius} color={brown[color]} half="left" />
    {range(8, 14).map((angle, index) => (
      <Triangle
        key={index}
        angle={angle}
        radius={radius}
        color={brown[color]}
      />
    ))}
    <Triangle angle={14} radius={radius} color={brown[color]} half="right" />
  </g>
);

/** black center pupil */
const Pupil = () => (
  <g className={classes.pupil}>
    <circle cx="0" cy="0" r={r4} fill={blue[4]} />
  </g>
);
