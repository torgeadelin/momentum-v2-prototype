import { useRef } from "react";

import {
  MomentumSelectProps,
} from "./";

import { useSelectState } from "@react-stately/select";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { useButton } from "@react-aria/button";
import { FocusScope } from "@react-aria/focus";
import { useOverlay, DismissButton } from "@react-aria/overlays";
import { Button } from "components/button";
import { ListBoxBase } from "components/listbox";

const Select = <T extends object>(props: MomentumSelectProps<T>) => {
  // Create state based on the incoming props
  let state = useSelectState(props);

  let boxRef = useRef<HTMLUListElement>(null);

  // Get props for child elements from useSelect
  let selectRef = useRef(null);
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    selectRef
  );

  // Get props for the button based on the trigger props from useSelect
  let { buttonProps } = useButton(triggerProps, selectRef);

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  let overlayRef = useRef(null);
  let { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      shouldCloseOnBlur: true,
      isOpen: state.isOpen,
      isDismissable: true,
    },
    overlayRef
  );

  const listBox = (
    // Wrap in <FocusScope> so that focus is restored back to the
    // trigger when the popup is closed. In addition, add hidden
    // <DismissButton> components at the start and end of the list
    // to allow screen reader users to dismiss the popup easily.
    <FocusScope restoreFocus>
      <div {...overlayProps} ref={overlayRef}>
        <DismissButton onDismiss={() => state.close()} />
        <ListBoxBase
          ref={boxRef}
          {...menuProps}
          state={state}
          autoFocus={state.focusStrategy || true}
        />
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </FocusScope>
  );

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div {...labelProps}>{props.label}</div>
      <HiddenSelect
        state={state}
        triggerRef={selectRef}
        label={props.label}
        name={props.name}
      />
      <Button variant="secondary" {...buttonProps} ref={selectRef}>
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : "Select an option"}
        </span>
        <span aria-hidden="true" style={{ paddingLeft: 5 }}>
          ▼
        </span>
      </Button>
      {state.isOpen && listBox}
    </div>
  );
};

// const _Select = React.forwardRef(Select);
export { Select };
