import { forwardRef, memo } from "react";
import Spin from "@/components/ui/Spin";
import cn from "classnames";

type ButtonElement = HTMLButtonElement;

export interface ButtonProps
  extends Omit<JSX.IntrinsicElements["button"], "ref" | "type"> {
  type?: "default" | "primary" | "wrapper" | "cancel" | "approve";
  htmlType?: JSX.IntrinsicElements["button"]["type"];
  loading?: boolean;
  preventClickOnLoading?: boolean;
}

const typeClasses = {
  default:
    "nes-btn font-medium py-2 px-4 rounded",
  primary:
    "nes-btn is-primary font-medium py-2 px-4 rounded",
  wrapper:
    "bg-yellow-500 hover:bg-yellow-700 text-black font-medium py-2 px-4 rounded",
  cancel:
    "nes-btn is-error font-medium py-2 px-4 rounded",
  approve:
    "nes-btn is-success font-medium py-2 px-4 rounded",
};

const Button = forwardRef<ButtonElement, ButtonProps>(function ButtonComponent(
  {
    children,
    type = "default",
    htmlType = "button",
    className,
    loading = false,
    preventClickOnLoading = true,
    ...restProps
  }: ButtonProps,
  ref
) {
  const buttonClasses = cn(className, typeClasses[type], "flex", {
    "opacity-50 cursor-not-allowed": preventClickOnLoading && loading,
  });
  return (
    <div>
      <button
        className={buttonClasses}
        type={htmlType}
        ref={ref}
        {...restProps}
      >
        {children} {loading && <Spin loading={loading} />}
      </button>
    </div>
  );
});

export default memo(Button);
