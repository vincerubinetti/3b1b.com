import DarkToggle from "@/components/DarkToggle/DarkToggle";
import classes from "./Footer.module.css";

const Footer = () => (
  <footer className={classes.footer} data-dark="true">
    <span suppressHydrationWarning>
      © {new Date().getFullYear()} Grant Sanderson
    </span>
    <DarkToggle />
  </footer>
);

export default Footer;
