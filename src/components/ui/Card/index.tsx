import React, { memo } from "react";
import cn from "classnames";

type CardProps = Omit<JSX.IntrinsicElements["div"], "ref"> & {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  type?: "default" | "rounded";
  titleAlign?: "default" | "centered";
};

const Card: React.FC<CardProps> = ({
  className,
  children,
  title,
  type = "default",
  titleAlign = "default",
  ...restProps
}) => {
  const withTitle = Boolean(title);
  return (
    <div
      className={cn("nes-container p-4", className, {
        "with-title": withTitle,
        "is-centered": titleAlign === "centered",
        "is-rounded": type === "rounded",
      })}
      {...restProps}
    >
      {withTitle && <p className="title">{title}</p>}
      {children}
    </div>
  );
};

export default memo(Card);
