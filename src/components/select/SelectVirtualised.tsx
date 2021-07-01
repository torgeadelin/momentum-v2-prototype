import React, { RefObject, useRef, ReactElement, useContext } from "react";
import classnames from "classnames";
import { ListState } from "@react-stately/list";
import { layoutInfoToStyle, useVirtualizerItem } from "@react-aria/virtualizer";

import styles from "./Select.module.scss";
import {
  MomentumListBoxPopupProps,
  MomentumOptionProps,
  MomentumSelectProps,
  ListBoxSectionProps,
} from ".";

import { Node } from "@react-types/shared";
import { ListLayout } from "@react-stately/layout";

import { useDOMRef, DOMRef } from "utils/refs";
import { useSelectState } from "@react-stately/select";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { useSeparator } from "@react-aria/separator";
import { useListBox, useOption, useListBoxSection } from "@react-aria/listbox";
import { useListState } from "@react-stately/list";
import { mergeProps } from "@react-aria/utils";
import { useButton } from "@react-aria/button";
import { useFocus, usePress, useHover } from "@react-aria/interactions";
import { FocusScope } from "@react-aria/focus";
import { useOverlay, DismissButton } from "@react-aria/overlays";
import { Button } from "components/button";
import { ReusableView } from "@react-stately/virtualizer";
import { Virtualizer, VirtualizerItem } from "@react-aria/virtualizer";

const Select = <T extends object>(props: MomentumSelectProps<T>) => {
  // Create state based on the incoming props
  let state = useSelectState(props);

  let boxRef = useRef<HTMLDivElement>(null);

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
        <ListBoxPopup
          ref={boxRef as React.RefObject<HTMLDivElement>}
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

function _ListBoxPopup<T extends object>(
  props: MomentumListBoxPopupProps<T>,
  ref: RefObject<HTMLDivElement>
) {
  const { state, ...otherProps } = props;

  // Get props for the listbox
  let { listBoxProps } = useListBox(
    {
      autoFocus: props.autoFocus,
      disallowEmptySelection: true,
      ...otherProps,
      isVirtualized: true,
    },
    state,
    ref
  );

  // This overrides collection view's renderWrapper to support heirarchy of items in sections.
  // The header is extracted from the children so it can receive ARIA labeling properties.
  type View = ReusableView<Node<T>, unknown>;
  let renderWrapper = (
    parent: View,
    reusableView: View,
    children: View[],
    renderChildren: (views: View[]) => ReactElement[]
  ) => {
    if (reusableView.viewType === "section") {
      return (
        <ListBoxSection
          key={reusableView.key}
          reusableView={reusableView}
          header={children.find((c) => c.viewType === "header")}
        >
          {renderChildren(children.filter((c) => c.viewType === "item"))}
        </ListBoxSection>
      );
    }

    return (
      <VirtualizerItem
        key={reusableView.key}
        reusableView={reusableView}
        parent={parent}
      />
    );
  };

  function useListBoxLayout<T>(state: ListState<T>) {
    let layout = new ListLayout<T>({
      estimatedRowHeight: 40,
      estimatedHeadingHeight: 28,
      padding: 1,
    });

    layout.collection = state.collection;
    layout.disabledKeys = state.disabledKeys;
    return layout;
  }

  let layout = useListBoxLayout(state);

  return (
    <ListBoxContext.Provider value={state}>
      <Virtualizer
        {...mergeProps(listBoxProps, otherProps)}
        className={classnames(styles.listBoxWrapper)}
        ref={ref}
        focusedKey={state.selectionManager.focusedKey}
        sizeToFit="height"
        scrollDirection="vertical"
        collection={state.collection}
        renderWrapper={renderWrapper}
        layout={layout}
      >
        {(type, item: Node<T>) => {
          if (type === "item") {
            return <Option item={item} />;
          }
        }}
      </Virtualizer>
    </ListBoxContext.Provider>
  );
}

const ListBoxPopup = React.forwardRef(_ListBoxPopup) as <T>(
  props: MomentumListBoxPopupProps<T> & { ref?: RefObject<HTMLDivElement> }
) => ReactElement;

export function Option<T>({ item }: MomentumOptionProps<T>) {
  // Get props for the option element
  let ref = React.useRef(null);
  let state = useContext(ListBoxContext);

  let isDisabled = state.disabledKeys.has(item.key);
  let isSelected = state.selectionManager.isSelected(item.key);
  let { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
    },
    state,
    ref
  );

  // Handle focus events so we can apply highlighted
  // style to the focused option
  let [isFocused, setFocused] = React.useState(false);
  let { focusProps } = useFocus({ onFocusChange: setFocused });

  let { pressProps, isPressed } = usePress({});
  let { hoverProps, isHovered } = useHover({});

  return (
    <li
      {...mergeProps(optionProps, focusProps, pressProps, hoverProps)}
      ref={ref}
      className={classnames(
        styles.listBoxItem,
        { [styles.focused]: isFocused },
        { [styles.hover]: isHovered },
        { [styles.pressed]: isSelected || isPressed }
      )}
    >
      {item.rendered}
    </li>
  );
}

export const ListBoxContext = React.createContext<ListState<unknown>>(null);

function ListBoxSection<T>({
  children,
  reusableView,
  header,
}: ListBoxSectionProps<T>) {
  let item = reusableView.content;

  let { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: item.rendered,
    "aria-label": item["aria-label"],
  });

  let headerRef = useRef();
  useVirtualizerItem({
    reusableView: header,
    ref: headerRef,
  });

  let { separatorProps } = useSeparator({
    elementType: "li",
  });

  const direction = "ltr";

  let state = useContext(ListBoxContext);

  // If the section is not the first, add a separator element.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      <div
        role="presentation"
        ref={headerRef}
        style={layoutInfoToStyle(header.layoutInfo, direction)}
      >
        {item.key !== state.collection.getFirstKey() && (
          <li
            {...separatorProps}
            style={{
              borderTop: "1px solid gray",
              margin: "2px 5px",
            }}
          />
        )}
        <li {...itemProps}>
          {item.rendered && (
            <span
              {...headingProps}
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                padding: "2px 5px",
              }}
            >
              {item.rendered}
            </span>
          )}
        </li>
      </div>
      <li
        {...groupProps}
        style={layoutInfoToStyle(reusableView.layoutInfo, direction)}
      >
        {children}
      </li>
    </>
  );
}

// const _Select = React.forwardRef(Select);
export { Select };
