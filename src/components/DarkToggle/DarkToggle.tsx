import { useEffect } from "react";
import { LuMoonStar, LuSun } from "react-icons/lu";
import clsx from "clsx";
import { useLocalStorage } from "@reactuses/core";
import classes from "./DarkToggle.module.css";

/** dark mode toggle */
const DarkToggle = () => {
  /** remember user preference */
  const [dark, setDark] = useLocalStorage("dark-mode", false);

  useEffect(() => {
    /** update root attribute */
    document.documentElement.dataset.dark = String(dark);
  });

  return (
    <label>
      <div className={clsx(classes.button, "button")}>
        <input
          className={classes.input}
          type="checkbox"
          aria-label="Toggle dark mode"
          checked={dark ?? undefined}
          onChange={(event) => setDark(event.target.checked)}
        />
        <span className={classes.icon}>
          {dark ? <LuMoonStar /> : <LuSun />}
        </span>
      </div>
    </label>
  );
};

export default DarkToggle;
