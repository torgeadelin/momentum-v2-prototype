import React, {RefObject} from "react";
import classnames from "classnames";
import { FocusRing } from "@react-aria/focus";

import styles from "./Button.module.scss";
import { MomentumButtonProps } from "./";
import { useDOMRef, DOMRef, } from "utils/refs";
import { useButton } from "@react-aria/button";
import { mergeProps } from "utils/mergeProps";

const Button = (props: MomentumButtonProps, ref: RefObject<HTMLButtonElement>) => {
  const { className, variant = "primary", disabled = false } = props;

  const { buttonProps } = useButton(
    { elementType: "button" },
    ref
  );
  
  const _props = mergeProps(props, buttonProps);

  return (
    <FocusRing focusClass={styles.focusRing} focusRingClass={styles.focusRing}>
      <button
        {..._props}
        ref={ref}
        className={classnames(styles.wrapper, className, styles[variant])}
        disabled={disabled}
      >
        {props.children}
      </button>
    </FocusRing>
  );
};

/**
 * TODO: Add description of component here.
 */
const _Button = React.forwardRef(Button);
export { _Button as Button };
