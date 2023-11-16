import classNames from "classnames";
import { createElement, memo } from "react";

const typeStyles = {
  default: "nes-text",
  category: "nes-text is-disabled leading-normal tracking-normal",
  primary: "nes-text is-primary leading-normal tracking-tight",
  secondary: "nes-text is-success leading-normal tracking-normal",
  error: "nes-text is-error leading-normal tracking-normal",
  bold: "nes-text text-xl font-bold leading-tight tracking-tight",
};

interface TitleProps {
  children: React.ReactNode;
  seo?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  className?: string;
  type?: "default" | "category" | "primary" | "secondary" | "bold" | "error" | undefined;
}

const Title = ({
  children,
  seo = "h1",
  className,
  type = "default",
  ...restProps
}: TitleProps) => {
  const classes = classNames(typeStyles[type], className);
  return createElement(seo, { className: classes, ...restProps }, children);
};

export default memo(Title);
