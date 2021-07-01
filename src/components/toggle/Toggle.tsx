import React, { useRef } from "react";
import classnames from "classnames";

import styles from "./Toggle.module.scss";
import { MomentumToggleProps } from "./";
import { useToggleState } from "@react-stately/toggle";
import { useDOMRef, DOMRef } from "utils/refs";
import { useSwitch } from "@react-aria/switch";
import { useFocusRing } from "@react-aria/focus";
import { VisuallyHidden } from "@react-aria/visually-hidden";

const Toggle = (props: MomentumToggleProps, ref: DOMRef<HTMLLabelElement>) => {
  const { className, children } = props;

  let domRef = useDOMRef(ref);
  let state = useToggleState(props);

  let inputRef = useRef<HTMLInputElement>(null);

  let { inputProps } = useSwitch(props, state, inputRef);
  const {isFocusVisible, focusProps} = useFocusRing(props);

  return (
      <label
        ref={domRef}
        className={classnames(
          styles.label,
          className,
          state.isSelected ? styles.selected : styles.default
        )}
      >
        <VisuallyHidden>
          <input {...inputProps} {...focusProps} ref={inputRef} />
        </VisuallyHidden>
        <svg width={44} height={22} aria-hidden="true">
          <rect
            x={0}
            y={0}
            width={44}
            height={22}
            rx={11}
            data-selected={state.isSelected}
          />
          <circle cx={state.isSelected ? 32 : 12} cy={11} r={5} />
          {isFocusVisible && (
          <rect
            x={1}
            y={1}
            width={43}
            height={20}
            rx={11}
            fill="none"
            stroke="blue"
            strokeWidth={1}
          />
        )}
        </svg>
        <span>{children}</span>
      </label>
  );
};

/**
 * TODO: Add description of component here.
 */
const _Toggle = React.forwardRef(Toggle);
export { _Toggle as Toggle };
