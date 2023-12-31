/* eslint-disable react-hooks/rules-of-hooks */
import type {
  CSSProperties,
  ReactElement,
  ReactNode,
  ComponentType,
  MemoExoticComponent} from "react";
import {
  useMemo,
  useCallback,
  cloneElement,
  isValidElement,
  useEffect
} from "react";
import { createPortal } from "react-dom";
import useUncontrolled from "@/hooks/useUncrontrolled";
import Button from "@/components/ui/Button";

const defaultRoot = "modal-root";
const defaultButtonsToClose = ["Escape"];

export type ModalChildProps = {
  visible: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
};

export interface ModalProps
  extends Omit<JSX.IntrinsicElements["div"], "ref" | "children" | "title">,
    Pick<
      CSSProperties,
      "width" | "minWidth" | "maxWidth" | "height" | "minHeight" | "maxHeight"
    > {
  getModalRoot?: () => HTMLElement;
  unmount?: boolean;
  overlayClassName?: string;
  overlayStyle?: CSSProperties;
  closable?: boolean;
  closableByKeyboard?: boolean;
  buttonsToClose?: string[];
  visible?: boolean;
  defaultVisible?: boolean;
  children?: ReactNode | ((props: ModalChildProps) => ReactNode);
  component?: ComponentType<any> | MemoExoticComponent<any>;
  componentProps?: object;
  forwardControl?: boolean;
  trigger?:
    | ReactElement<{ onClick: () => void }>
    | ((props: ModalChildProps) => ReactNode);
  onVisibleChange?: (visible: boolean) => void;
}

function Modal({
  getModalRoot,
  className,
  style,
  overlayClassName,
  overlayStyle,
  children,
  component: Component,
  componentProps,
  closable = true,
  unmount = true,
  forwardControl = false,
  closableByKeyboard,
  buttonsToClose = defaultButtonsToClose,
  visible,
  defaultVisible,
  trigger,
  onVisibleChange,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  ...divProps
}: ModalProps) {
  
  const controlledVisibility = useMemo(() => visible !== undefined, []);
  if (!controlledVisibility) {
    const [_visible, _onVisibleChange] = useUncontrolled(
      Boolean(defaultVisible),
      onVisibleChange
    );
    visible = _visible;
    onVisibleChange = _onVisibleChange;
  }

  const handleOpen = useCallback(() => {
    if (onVisibleChange) onVisibleChange(true);
  }, [onVisibleChange]);

  const handleClose = useCallback(() => {
    if (typeof window === "undefined") return
    if (onVisibleChange) onVisibleChange(false);
    const body = document.getElementById("body");
    if (body) {
      body.className = "";
    }

  }, [onVisibleChange]);

  const noScroll = useCallback(() => {
    if (typeof window === "undefined") return
    const body = document.getElementById("body");
    const notIncludes = !body?.className.includes('overflow-hidden')
    if (body && notIncludes) {
      body.className += "overflow-hidden";
    }
  }, []);

  const childProps: ModalChildProps = {
    visible: Boolean(visible),
    onVisibleChange,
    onClose: handleClose,
    onOpen: handleOpen,
  };
  
  const triggerElement: ReactNode =
    typeof trigger === "function"
      ? trigger(childProps)
      : trigger
      ? cloneElement(trigger, { onClick: handleOpen })
      : null;

  if (typeof window === 'undefined') return <>{triggerElement}</>

  const modalRoot = useMemo(
    () =>{
      return getModalRoot ? getModalRoot() : document.getElementById(defaultRoot)!},
    []
  );

  const modalStyle = useMemo(
    () => ({
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      ...style,
    }),
    [width, minWidth, maxWidth, height, minHeight, maxHeight, style]
  );
  

  useEffect(() => {
    if (!(closable || closableByKeyboard) || typeof window === "undefined")
      return;
    const handleKeydown = (e: KeyboardEvent) =>
      buttonsToClose.includes(e.code) && handleClose();
    document.addEventListener<"keydown">("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [closableByKeyboard, buttonsToClose, handleClose, closable]);

    visible && noScroll()


  const modalElement = (
    <div
      className={`bg-[rgba(26, 27, 44, 0.5)] absolute top-0 left-0 flex h-screen w-screen justify-center p-10 align-middle ${overlayClassName}`}
      style={overlayStyle}
      hidden={!visible}
    >
      <div
        className={`relative rounded-sm bg-white p-12 ${className}`}
        style={modalStyle}
        {...divProps}
      >
        {closable && (
          <div>
          <Button type="cancel" className="absolute top-3 right-3" onClick={handleClose}>
            X
          </Button>
          </div>
        )}
        {!children
          ? null
          : typeof children === "function"
          ? children(childProps)
          : forwardControl && isValidElement(children)
          ? cloneElement(children, childProps)
          : children}
        {Component ? <Component {...componentProps} {...childProps} /> : null}
      </div>
    </div>
  );

  return (
    <>
      {triggerElement}
      {visible || !unmount ? createPortal(modalElement, modalRoot!) : null}
    </>
  );
}

export default Modal;
