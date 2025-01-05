import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import clsx from "clsx";
import classes from "./Link.module.css";

type Props = {
  /** force link opening in new/same tab */
  newTab?: boolean;
  /** force showing/hiding arrow icon */
  showIcon?: boolean;
  /** class */
  className?: string;
  /** content */
  children: ReactNode;
} & ComponentProps<typeof NextLink>;

/** link to internal route or external url */
const Link = ({
  ref,
  href,
  children,
  newTab,
  showIcon,
  className,
  ...props
}: Props) => {
  /** whether link is external (some other site) or internal (within router) */
  const external = typeof href === "string" && href.match(/^(http|mailto)/);

  /** whether to open link in new tab */
  const target = (newTab ?? external) ? "_blank" : "";

  /** whether to show arrow icon */
  const _showArrow = showIcon ?? target;

  return (
    <NextLink
      ref={ref}
      href={href}
      target={target}
      className={clsx(classes.link, className)}
      {...props}
    >
      {children}
      {_showArrow && <FaArrowUpRightFromSquare className={classes.icon} />}
    </NextLink>
  );
};

export default Link;
