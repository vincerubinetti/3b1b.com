import type { ComponentProps, Ref } from "react";
import clsx from "clsx";
import Link from "@/components/Link/Link";
import classes from "./Button.module.css";

type Base = {
  /** look */
  design?: "normal" | "hollow" | "critical";
  /** class */
  className?: string;
};

type _Link = Pick<
  ComponentProps<typeof Link>,
  "ref" | "children" | "href" | "style"
>;

type _Button = Pick<
  ComponentProps<"button">,
  | "ref"
  | "children"
  | "type"
  | "style"
  | "onClick"
  | "onDrag"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
>;

type Props = Base & (_Link | _Button);

/**
 * looks like a button and either goes somewhere (link) or does something
 * (button)
 */
const Button = ({ ref, design = "normal", className, ...props }: Props) => {
  /** if "to", render as link */
  if ("href" in props)
    return (
      <Link
        ref={ref as Ref<HTMLAnchorElement>}
        className={clsx(classes.button, classes[design], className)}
        showIcon={false}
        {...props}
      />
    );
  /** otherwise, render as button */ else
    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={clsx(classes.button, classes[design], className)}
        type="button"
        {...props}
      />
    );
};

export default Button;
