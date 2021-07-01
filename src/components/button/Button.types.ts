import {
  AriaLabelingProps,
  PressEvents,
  FocusableProps,
  StyleProps,
} from "@react-types/shared";
import React from "react";

export interface MomentumButtonProps
  extends AriaLabelingProps,
    PressEvents,
    FocusableProps,
    StyleProps {
  /**
   *  Class to override the existing style
   */
  className?: string;
  /**
   * If set to true, the button will autofocus on render
   * @default "false"
   */
  autoFocus?: boolean;
  /**
   * Determines the style of the button
   * @default "primary"
   */
  variant?:
    | "primary"
    | "secondary"
    | "join"
    | "outline-join"
    | "cancel"
    | "outline-cancel"
    | "message"
    | "ghost";

  /**
   * Indicates if the button is disabled
   * @default "false"
   */
  disabled?: boolean;

  children?: React.ReactNode;
}
