import classes from "./FillText.module.css";

type Props = {
  text: string;
};

/** animate text like manim */
const FillText = ({ text }: Props) => (
  <span>
    {text.split("").map((char, index) => (
      <span
        key={index}
        className={classes.char}
        style={{ animationDelay: index * 0.1 + "s" }}
      >
        {char}
      </span>
    ))}
  </span>
);

export default FillText;
