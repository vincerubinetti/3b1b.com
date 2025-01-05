import Link from "next/link";
import DarkToggle from "@/components/DarkToggle/DarkToggle";
import FillText from "@/components/FillText/FillText";
import GridBackground from "@/components/GridBackground/GridBackground";
import Logo from "@/components/Logo/Logo";
import { title } from "@/vars";
import classes from "./Header.module.css";

/** first links, on left */
const primary = [
  { to: "", text: "Lessons" },
  { to: "", text: "SoME" },
  { to: "", text: "Extras" },
];

/** second links, on right */
const secondary = [
  { to: "", text: "Store" },
  { to: "", text: "FAQ" },
  { to: "", text: "Contact" },
  { to: "", text: "About" },
];

const Header = () => (
  <header className={classes.header} data-dark="true">
    <GridBackground />

    <nav className={classes.nav}>
      {primary.map(({ to, text }, index) => (
        <a key={index} href={to}>
          {text}
        </a>
      ))}
    </nav>
    <Link href="/" className={classes.title}>
      <Logo className={classes.logo} />
      <FillText text={title} />
    </Link>
    <nav className={classes.nav}>
      {secondary.map(({ to, text }, index) => (
        <a key={index} href={to}>
          {text}
        </a>
      ))}
      <DarkToggle />
    </nav>
  </header>
);

export default Header;
