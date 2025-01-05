import classes from "./Footer.module.css";

const Footer = () => (
  <footer className={classes.footer} data-dark="true">
    <span suppressHydrationWarning>
      © {new Date().getFullYear()} Grant Sanderson
    </span>
  </footer>
);

export default Footer;
